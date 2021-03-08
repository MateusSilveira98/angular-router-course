import { ConfirmExitGuard } from "./../services/confirm-exit.guard";
import { LessonDetailResolver } from "./services/lesson-detail.resolver.service";
import { LessonsListComponent } from "./lessons-list/lessons-list.component";
import { LessonDetailComponent } from "./lesson/lesson-detail.component";
import { NgModule } from "@angular/core";
import { RouterModule, Routes } from "@angular/router";
import { CourseComponent } from "./course/course.component";
import { HomeComponent } from "./home/home.component";
import { CourseResolver } from "./services/course.resolver.service";
import { LessonResolver } from "./services/lessons.resolver.service";
import { AuthGuard } from "../services/auth.guard";

const routes: Routes = [
  {
    path: "",
    component: HomeComponent,
  },
  {
    path: ":courseUrl",
    component: CourseComponent,
    canActivate: [AuthGuard],
    canActivateChild: [AuthGuard],
    canDeactivate: [ConfirmExitGuard],
    children: [
      {
        path: "",
        component: LessonsListComponent,
        resolve: {
          lessons: LessonResolver,
        },
      },
      {
        path: "lesson/:lessonSeqNo",
        component: LessonDetailComponent,
        resolve: {
          lesson: LessonDetailResolver,
        },
      },
    ],
    resolve: {
      course: CourseResolver,
    },
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
  providers: [
    CourseResolver,
    LessonResolver,
    LessonDetailResolver,
    AuthGuard,
    ConfirmExitGuard,
  ],
})
export class CoursesRoutingModule {}
