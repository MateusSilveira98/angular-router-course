import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, Resolve, RouterStateSnapshot } from '@angular/router';
import { Observable } from 'rxjs';
import { first } from 'rxjs/operators';
import { LessonSummary } from '../model/lesson-summary';
import { CoursesService } from './courses.service';

@Injectable()
export class LessonResolver implements Resolve<LessonSummary[]> {
  constructor(private coursesService: CoursesService) {}
  resolve(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ): Observable<LessonSummary[]> {
    const courseUrl = route.paramMap.get("courseUrl");

    return this.coursesService.loadAllCourseLessonsSummary(courseUrl);
  }
}
