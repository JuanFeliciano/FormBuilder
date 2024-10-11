import {
  AfterViewInit,
  Component,
  ElementRef,
  HostListener,
  OnInit,
  Renderer2,
  ViewChild,
} from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { FormGroupModel } from 'src/app/models/interfaces/interfaces';
import { FormGroupService } from 'src/app/services/FormGroupService/form-gp.service';
import { UserService } from 'src/app/services/UserService/user.service';
import { FormGroupUpdaterComponent } from '../../UpdaterComponents/FormGroupUpdater/form-group-updater.component';
import { FormGroupDeleterComponent } from '../../DeleterComponents/FormGroupDeleter/form-group-deleter.component';
import { FormCreatorComponent } from '../../CreatorComponents/FormCreator/form-creator.component';

@Component({
  selector: 'app-box-form-group',
  templateUrl: './box-form-group.component.html',
  styleUrls: ['./box-form-group.component.scss'],
})
export class BoxFormGroupComponent implements OnInit {
  formGroup: FormGroup;
  idFormGroup: number = 0;
  indexUpdate: number;
  indexDelete: number;
  visibleElements: boolean[] = [];
  role: string | null = this.userService.getRole();
  formGroupList: FormGroupModel[] = [];
  filteredGroups: FormGroupModel[] = [];
  selectedFormGroup: FormGroupModel = { id: 0, title: '', forms: [] };

  @ViewChild('dialog') dialog: ElementRef<HTMLDialogElement>;
  @ViewChild(FormGroupUpdaterComponent)
  updaterComponent: FormGroupUpdaterComponent;
  @ViewChild(FormGroupDeleterComponent)
  deleterComponent: FormGroupDeleterComponent;
  @ViewChild(FormCreatorComponent)
  creatorComponent: FormCreatorComponent;

  constructor(
    private formGroupService: FormGroupService,
    private userService: UserService,
    private fb: FormBuilder
  ) {}

  ngOnInit(): void {
    this.getFormGroup();

    this.formGroupService.formGroupCreated.subscribe(() => {
      this.getFormGroup();
    });

    this.formGroup = this.fb.group({
      id: 0,
      title: '',
    });

    this.visibleElements = new Array(this.formGroupList.length).fill(false);
  }

  getFormGroup(): void {
    this.formGroupService.getFormGroup().subscribe({
      next: (data: FormGroupModel[]) => {
        this.formGroupList = data;
        this.filteredGroups = [...this.formGroupList];
      },
    });
  }

  getFormGroupById(id: number): void {
    if (this.dialog.nativeElement.open) return;

    this.formGroupService.getFormGroupById(id).subscribe({
      next: (data: FormGroupModel) => {
        this.selectedFormGroup = data;
        this.dialog.nativeElement.showModal();
      },
      error: (err) => {
        console.error('Failed to fetch form group', err);
      },
    });
  }

  createForm(): void {
    this.creatorComponent.openDialog();
  }

  updateGroup(id: number): void {
    this.updaterComponent.getFormGroupByIdToPut(id);
  }

  openDialog(id: number): void {
    this.idFormGroup = id;
    this.getFormGroupById(id);
  }

  closeDialog(): void {
    if (this.dialog.nativeElement.open) {
      this.dialog.nativeElement.close();
    }
  }

  openPutDialog(formGroup: FormGroupModel, indexUpdate: number): void {
    this.indexUpdate = indexUpdate;
    this.selectedFormGroup = formGroup;
    this.updaterComponent.getFormGroupByIdToPut(this.selectedFormGroup.id);
    this.formGroup.patchValue({ id: formGroup.id, title: formGroup.title });
  }

  deleteFormGroup(formGroup: FormGroupModel, index: number): void {
    this.indexDelete = index;
    this.deleterComponent.deleteFormGroup(formGroup);
  }

  toggleElement(indexUpdate: number): void {
    this.visibleElements[indexUpdate] = !this.visibleElements[indexUpdate];
  }

  onSearch(searchValue: string): void {
    this.formGroupService.getFormGroup().subscribe({
      next: (data: FormGroupModel[]) => {
        this.filteredGroups = data.filter((i) =>
          i.title.toLocaleLowerCase().includes(searchValue.toLocaleLowerCase())
        );
      },
    });
  }

  onGroupUpdated(group: FormGroupModel): void {
    this.selectedFormGroup = group;
    this.filteredGroups[this.indexUpdate] = group;
  }

  onGroupDeleted(): void {
    console.log(this.indexDelete);
    this.filteredGroups.splice(this.indexDelete, 1);
  }

  onGroupCreated(): void {}

  canView(): boolean {
    if (this.role === 'Admin') {
      return true;
    } else {
      return false;
    }
  }

  @HostListener('document:click', ['$event'])
  outClick(event: Event) {
    const clickInside = (event.target as HTMLElement).closest('.btn-edit');

    if (!clickInside) {
      this.visibleElements = new Array(this.formGroupList.length).fill(false);
    }
  }
}
