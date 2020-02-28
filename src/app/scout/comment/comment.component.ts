import { Component, OnInit } from '@angular/core';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {LoggerService} from '../../services/loggerService/logger.service';
import {Router} from '@angular/router';
import {FormService} from '../../services/formService/form.service';
import {ScoutComments} from '../../objects/scout-Comments';

@Component({
  selector: 'app-comment',
  templateUrl: './comment.component.html',
  styleUrls: ['./comment.component.scss'],
})
export class CommentComponent implements OnInit {

  public commentForm: FormGroup;

  constructor(
      private fb: FormBuilder,
      private logger: LoggerService,
      public router: Router,
      private formService: FormService
  ) { }

  private createCommentForm(c?: ScoutComments): void {
    if (c === undefined) {
      c = new ScoutComments();
    }
    this.commentForm = this.fb.group({
      drive: this.fb.group({
        comm_flAssist: c.drive.comm_flAssist,
        comm_idDriveRating: c.drive.comm_idDriveRating,
        comm_idDefenceRating: c.drive.comm_idDefenceRating,
      }),
      quickRatings: this.fb.group({
        comm_flAlliance: c.quickRatings.comm_flAlliance,
        comm_flStrategy: c.quickRatings.comm_flStrategy,
        comm_flOwnThing: c.quickRatings.comm_flOwnThing,
        comm_flRecovery: c.quickRatings.comm_flRecovery,
      }),
      advice: this.fb.group({
        comm_flWarning: [c.advice.comm_flWarning, Validators.required],
        comm_flHighlight: [c.advice.comm_flHighlight, Validators.required],
        comm_txNotes: c.comm_txNotes
      }),
      shotType: this.fb.group({
        comm_flShotFar: c.shotType.comm_flShotFar,
        comm_flShotMid: c.shotType.comm_flShotMid,
        comm_flShotNear: c.shotType.comm_flShotNear,
        comm_flShotWall: c.shotType.comm_flShotWall
      }),
      loadType: this.fb.group({
        comm_flIntakeGround: c.loadType.comm_flIntakeGround,
        comm_flIntakeHigh: c.loadType.comm_flIntakeHigh,
        comm_flIntakeRobot: c.loadType.comm_flIntakeRobot
      }),
    })
  }

  public onSubmit(): void {
    this.logger.max('CommentComponent, onSubmit, values: ', this.commentForm.value);
    const c: ScoutComments = this.commentForm.value;
    c.comm_txNotes = this.commentForm.value.advice.comm_txNotes;
    this.formService.pushCommentData(c);
  }

  ngOnInit() {
    this.formService.scout$.subscribe(s => {
      const c: ScoutComments = s.comments;
      this.createCommentForm(c);
    });


  }

}
