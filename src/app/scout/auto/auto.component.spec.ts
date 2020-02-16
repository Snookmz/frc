import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { AutoComponent } from './auto.component';

describe('AutoComponent', () => {
  let component: AutoComponent;
  let fixture: ComponentFixture<AutoComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AutoComponent ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(AutoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
