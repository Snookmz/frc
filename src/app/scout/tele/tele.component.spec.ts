import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { TeleComponent } from './tele.component';

describe('TeleComponent', () => {
  let component: TeleComponent;
  let fixture: ComponentFixture<TeleComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TeleComponent ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(TeleComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
