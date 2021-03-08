import { LessonDetail } from "./../model/lesson-detail";
import { Injectable } from "@angular/core";
import {
  ActivatedRouteSnapshot,
  Resolve,
  RouterStateSnapshot,
} from "@angular/router";
import { CoursesService } from "./courses.service";
import { Observable } from "rxjs";

@Injectable()
export class LessonDetailResolver implements Resolve<LessonDetail> {
  constructor(private courseService: CoursesService) {}
  resolve(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ): Observable<LessonDetail> {
    const courseUrl = route.parent.paramMap.get("courseUrl");
    const lessonSeqNo = route.paramMap.get("lessonSeqNo");

    return this.courseService.loadLessonDetail(courseUrl, lessonSeqNo);
  }
}
