import { Component, OnInit } from '@angular/core';
import {FormBuilder, FormGroup} from '@angular/forms';
import {LoggerService} from '../../services/loggerService/logger.service';

@Component({
  selector: 'app-comment',
  templateUrl: './comment.component.html',
  styleUrls: ['./comment.component.scss'],
})
export class CommentComponent implements OnInit {

  public commentForm: FormGroup;

  constructor(
      private fb: FormBuilder,
      private logger: LoggerService
  ) { }

  private createCommentForm(): void {
    this.commentForm = this.fb.group({
      drive: this.fb.group({
        comm_flAssist: false,
        comm_idDriveRating: '',
        comm_idDefenceRating: '',
      }),
      quickRatings: this.fb.group({
        comm_flAlliance: false,
        comm_flStrategy: false,
        comm_flOwnThing: false,
        comm_flRecovery: false,
      }),
      advice: this.fb.group({
        comm_flWarning: false,
        comm_flHighlight: false,
        comm_txNotes: ''
      }),
      shotType: this.fb.group({
        comm_flShotFar: false,
        comm_flShotMid: false,
        comm_flShotNear: false,
        comm_flShotWall: false
      }),
      loadType: this.fb.group({
        comm_flIntakeGround: false,
        comm_flIntakeHigh: false,
        comm_flIntakeRobot: false
      }),
    })
  }

  ngOnInit() {
    this.createCommentForm();
  }

}
