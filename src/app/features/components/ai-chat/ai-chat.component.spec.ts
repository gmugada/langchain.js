import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AiChatComponent } from './ai-chat.component';

describe('AiChatComponent', () => {
  let component: AiChatComponent;
  let fixture: ComponentFixture<AiChatComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [AiChatComponent]
    });
    fixture = TestBed.createComponent(AiChatComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
