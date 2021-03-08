import { CoursesService } from "./courses.service";
import { Observable } from "rxjs";
import { Injectable } from "@angular/core";
import {
  ActivatedRouteSnapshot,
  Resolve,
  RouterStateSnapshot,
} from "@angular/router";
import { Course } from "../model/course";
import { first } from "rxjs/operators";

@Injectable()
export class CourseResolver implements Resolve<Course> {
  constructor(private courseService: CoursesService) {}
  resolve(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ): Observable<Course> {
    const courseUrl = route.paramMap.get("courseUrl");

    return this.courseService.loadCourseByUrl(courseUrl).pipe(first());
  }
}
