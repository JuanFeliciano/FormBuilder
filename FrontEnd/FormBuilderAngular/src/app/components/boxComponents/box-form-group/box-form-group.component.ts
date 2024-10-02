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
import { FormGroupModel } from 'src/app/interfaces/interfaces';
import { FormGroupService } from 'src/app/services/FormGroupService/form-gp.service';
import { FormGroupUpdaterComponent } from '../../updaterComponents/form-group-updater/form-group-updater.component';
import { FormGroupDeleterComponent } from '../../deleterComponents/form-group-deleter/form-group-deleter.component';
import { UserService } from 'src/app/services/UserService/user.service';
import { FormGroupCreatorComponent } from '../../creatorComponents/form-group-creator/form-group-creator.component';
import { FormCreatorComponent } from '../../creatorComponents/form-creator/form-creator.component';

@Component({
  selector: 'app-box-form-group',
  templateUrl: './box-form-group.component.html',
  styleUrls: ['./box-form-group.component.scss'],
})
export class BoxFormGroupComponent implements OnInit {
  formGroup: FormGroup;
  idFormGroup: number = 0;
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

    this.formGroup = this.fb.group({
      id: 0,
      title: '',
    });

    this.formGroupService.formGroupCreated.subscribe(() => this.getFormGroup());
    this.formGroupService.formGroupUpdated.subscribe(() => this.getFormGroup());
    this.formGroupService.formGroupDeleted.subscribe(() => this.getFormGroup());

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

    this.updaterComponent.updateEvent.subscribe(() => {
      const updatedGroup = this.formGroupList.find(
        (fg) => fg.id === this.selectedFormGroup.id
      );
      if (updatedGroup) {
        updatedGroup.title = this.selectedFormGroup.title;
      }

      this.selectedFormGroup.title =
        this.updaterComponent.formGroup.get('title')?.value;
    });
  }

  openDialog(event: Event, id: number): void {
    this.idFormGroup = id;
    this.getFormGroupById(id);
    event.stopPropagation();
  }

  closeDialog(event: Event): void {
    event.stopPropagation();
    if (this.dialog.nativeElement.open) {
      this.dialog.nativeElement.close();
    }
  }

  openPutDialog(event: Event, formGroup: FormGroupModel): void {
    event.stopPropagation();

    this.selectedFormGroup = formGroup;
    this.updaterComponent.getFormGroupByIdToPut(this.selectedFormGroup.id);
    this.formGroup.patchValue({ id: formGroup.id, title: formGroup.title });
  }

  toggleElement(index: number): void {
    this.visibleElements[index] = !this.visibleElements[index];
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

  @HostListener('document:click', ['$event'])
  outClick(event: Event) {
    const clickInside = (event.target as HTMLElement).closest('.btn-edit');

    if (!clickInside) {
      this.visibleElements = new Array(this.formGroupList.length).fill(false);
    }
  }
}
