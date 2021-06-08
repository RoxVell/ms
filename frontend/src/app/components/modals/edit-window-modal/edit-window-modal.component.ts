import { AfterViewInit, Component, EventEmitter, Inject, OnInit, Output, ViewChild } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from "@angular/material/dialog";
import { EditServiceModalComponent } from "../edit-service-modal/edit-service-modal.component";
import { Window } from "../../../windows/windows.service";
import { FormBuilder, FormControl, FormGroup, Validators } from "@angular/forms";
import { WINDOW_TYPE, WINDOW_TYPES } from "../../../../../../backend/src/windows/dto/window-type";
import { OperatorsService } from "../../../operators/operators.service";
import { first, map, switchMap, tap } from "rxjs/operators";
import { SelectionModel } from '@angular/cdk/collections';
import { FlatTreeControl } from '@angular/cdk/tree';
import { MatTreeFlatDataSource, MatTreeFlattener } from '@angular/material/tree';
import { combineLatest } from 'rxjs';
import { ServicesService } from "../../../services/services.service";
import { ServiceTreeService } from "../../service-tree/service-tree.service";
import { CreateWindowDto } from "../../../../../../backend/src/windows/dto/create-window.dto";

export class FlatItem {
  id!: number;
  items!: FlatItem[];
  path!: string[];
  service_id!: number;
}

export class FlatNode {
  expandable!: boolean;
  id!: number;
  service_id!: number;
  path!: string;
  level!: number;
}

export enum EDIT_MODE {
  EDIT = 'edit',
  CREATE = 'create'
}

interface DialogData {
  editMode: EDIT_MODE;
  window: Omit<Window, 'id'>;
}

@Component({
  selector: 'app-edit-window-modal',
  templateUrl: './edit-window-modal.component.html',
  styleUrls: ['./edit-window-modal.component.css']
})
export class EditWindowModalComponent implements OnInit, AfterViewInit {
  @ViewChild('tree', { static: false }) treeElement: any;

  @Output() confirm = new EventEmitter<CreateWindowDto>();

  services$ = this.servicesService.getServices();
  servicesDict$ = this.services$.pipe(map((services) => this.servicesService.buildDictByServices(services)));
  treeItems = this.serviceTreeService.getTreeItems();
  tree = combineLatest(this.treeItems, this.services$).pipe(
    map(([treeItems]) => this.serviceTreeService.buildTree(treeItems)),
    tap(() => {
      setTimeout(() => this.treeElement.treeControl.expandAll(), 200);
    })
  );

  flatNodeMap = new Map<FlatNode, FlatItem>();

  nestedNodeMap = new Map<FlatItem, FlatNode>();

  treeControl: FlatTreeControl<FlatNode>;

  treeFlattener: MatTreeFlattener<FlatItem, FlatNode>;

  dataSource: MatTreeFlatDataSource<FlatItem, FlatNode>;

  checklistSelection = new SelectionModel<FlatNode>(true /* multiple */);

  form!: FormGroup
  name!: FormControl;
  type!: FormControl;
  operators$ = this.operatorsService.getOperators();
  operatorsFormGroup$ = this.operators$.pipe(
    map((operators) => {
      const operatorsDict = operators.reduce((acc, operator) => {
        const isOperatorLinkedToWindow = this.data.window?.operatorIds.includes(operator.id) || false;
        acc[operator.id] = isOperatorLinkedToWindow;
        return acc;
      }, {} as {[key in number]: boolean});

      const formBuilderGroup = this.fb.group(operatorsDict);

      this.form = formBuilderGroup;

      return formBuilderGroup;
    })
  );

  windowTypes = WINDOW_TYPES;

  EDIT_MODE = EDIT_MODE;

  constructor(
    @Inject(MAT_DIALOG_DATA) public data: DialogData,
    public dialogRef: MatDialogRef<EditServiceModalComponent>,
    private operatorsService: OperatorsService,
    private fb: FormBuilder,
    private servicesService: ServicesService,
    private serviceTreeService: ServiceTreeService,
  ) {
    this.treeFlattener = new MatTreeFlattener(
      this.transformer,
      this.getLevel,
      this.isExpandable,
      this.getChildren
    );
    this.treeControl = new FlatTreeControl<FlatNode>(this.getLevel, this.isExpandable);
    this.dataSource = new MatTreeFlatDataSource(this.treeControl, this.treeFlattener);

    this.tree.subscribe((tree) => this.dataSource.data = tree);
  }

  ngAfterViewInit() {
    if (this.data.editMode === EDIT_MODE.EDIT) {
      setTimeout(() => this.selectInitServices());
    }
  }

  private selectInitServices() {
    for (let i = 0; i < this.treeControl.dataNodes.length; i++) {
      if (this.data.window.serviceIds.includes(this.treeControl.dataNodes[i].id)) {
        this.checklistSelection.select(this.treeControl.dataNodes[i]);
      }
    }
  }

  getLevel = (node: FlatNode) => node.level;

  isExpandable = (node: FlatNode) => node.expandable;

  getChildren = (node: FlatItem): FlatItem[] => node.items;

  hasChild = (_: number, _nodeData: FlatNode) => _nodeData.expandable;

  /**
   * Transformer to convert nested node to flat node. Record the nodes in maps for later use.
   */
  transformer = (node: FlatItem, level: number) => {
    const existingNode = this.nestedNodeMap.get(node);
    const flatNode = existingNode && existingNode.id === node.id
      ? existingNode
      : new FlatNode();
    flatNode.id = node.id;
    flatNode.level = level;
    flatNode.service_id = node.service_id;
    flatNode.expandable = !!node.items?.length;
    this.flatNodeMap.set(flatNode, node);
    this.nestedNodeMap.set(node, flatNode);
    return flatNode;
  }

  /** Whether all the descendants of the node are selected. */
  descendantsAllSelected(node: FlatNode): boolean {
    const descendants = this.treeControl.getDescendants(node);
    return descendants.length > 0 && descendants.every(child => {
      return this.checklistSelection.isSelected(child);
    });
  }

  /** Whether part of the descendants are selected */
  descendantsPartiallySelected(node: FlatNode): boolean {
    const descendants = this.treeControl.getDescendants(node);
    const result = descendants.some(child => this.checklistSelection.isSelected(child));
    return result && !this.descendantsAllSelected(node);
  }

  /** Toggle the to-do item selection. Select/deselect all the descendants node */
  todoItemSelectionToggle(node: FlatNode): void {
    console.log(node)
    this.checklistSelection.toggle(node);
    const descendants = this.treeControl.getDescendants(node);
    this.checklistSelection.isSelected(node)
      ? this.checklistSelection.select(...descendants)
      : this.checklistSelection.deselect(...descendants);

    // Force update for the parent
    descendants.forEach(child => this.checklistSelection.isSelected(child));
    this.checkAllParentsSelection(node);
  }

  /** Toggle a leaf to-do item selection. Check all the parents to see if they changed */
  todoLeafItemSelectionToggle(node: FlatNode): void {
    this.checklistSelection.toggle(node);
    this.checkAllParentsSelection(node);
  }

  /* Checks all the parents when a leaf node is selected/unselected */
  checkAllParentsSelection(node: FlatNode): void {
    let parent: FlatNode | null = this.getParentNode(node);
    while (parent) {
      this.checkRootNodeSelection(parent);
      parent = this.getParentNode(parent);
    }
  }

  /** Check root node checked state and change it accordingly */
  checkRootNodeSelection(node: FlatNode): void {
    const nodeSelected = this.checklistSelection.isSelected(node);
    const descendants = this.treeControl.getDescendants(node);
    const descAllSelected = descendants.length > 0 && descendants.every(child => {
      return this.checklistSelection.isSelected(child);
    });
    if (nodeSelected && !descAllSelected) {
      this.checklistSelection.deselect(node);
    } else if (!nodeSelected && descAllSelected) {
      this.checklistSelection.select(node);
    }
  }

  /* Get the parent node of a node */
  getParentNode(node: FlatNode): FlatNode | null {
    const currentLevel = this.getLevel(node);

    if (currentLevel < 1) {
      return null;
    }

    const startIndex = this.treeControl.dataNodes.indexOf(node) - 1;

    for (let i = startIndex; i >= 0; i--) {
      const currentNode = this.treeControl.dataNodes[i];

      if (this.getLevel(currentNode) < currentLevel) {
        return currentNode;
      }
    }
    return null;
  }

  getErrorMessage() {
    if (this.name.hasError('required')) {
      return 'Поле обязательно для заполнения';
    }

    return '';
  }

  ngOnInit(): void {
    const window = this.prepareWindowData();
    this.createForm(window);
  }

  prepareWindowData(): Omit<Window, 'id'> {
    const window = this.data.window || {};

    return {
      name: window.name || '',
      type: window.type || WINDOW_TYPE.CABINET,
      operatorIds: window.operatorIds || [],
      serviceIds: window.serviceIds || [],
    };
  }

  createForm(service: Omit<Window, 'id'>) {
    this.name = new FormControl(service.name, [Validators.required]);
    this.type = new FormControl(service.type);
  }

  onCancel() {
    this.dialogRef.close();
  }

  onSave() {
    const operatorIds = Object.entries(this.form.value)
      .filter(([_, value]) => value)
      .map(([key]) => Number(key));

    this.confirm.emit({
      operatorIds,
      name: this.name.value,
      type: this.type.value,
      serviceIds: this.checklistSelection.selected.map((service) => service.id)
    });
  }
}
