import { ChatComponent } from "./chat/chat.component";
import { CustomPreloadingStrategy } from "./services/custom-preloading-strategy";
import { PageNotFoundComponent } from "./page-not-found/page-not-found.component";
import { NgModule } from "@angular/core";
import {
  NoPreloading,
  PreloadAllModules,
  RouterModule,
  Routes,
  UrlSerializer,
} from "@angular/router";
import { AboutComponent } from "./about/about.component";
import { LoginComponent } from "./login/login.component";
import { CanLoadAuthGuard } from "./services/can-load-auth.guard";

const routes: Routes = [
  {
    path: "",
    pathMatch: "full",
    redirectTo: "courses",
  },
  {
    path: "courses",
    loadChildren: () =>
      import("./courses/courses.module").then((m) => m.CoursesModule),
    // canLoad: [CanLoadAuthGuard],
    data: {
      preload: false,
    },
  },
  {
    path: "login",
    component: LoginComponent,
  },
  {
    path: "about",
    component: AboutComponent,
  },
  {
    path: "helpdesk-chat",
    component: ChatComponent,
    outlet: "chat",
  },
  {
    path: "**",
    component: PageNotFoundComponent,
  },
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, {
      preloadingStrategy: CustomPreloadingStrategy,
      scrollPositionRestoration: "enabled",
      paramsInheritanceStrategy: "always",
      relativeLinkResolution: "corrected",
      malformedUriErrorHandler: (error: URIError, urlSerializer: UrlSerializer, url: string) => urlSerializer.parse("/page-not-found")
    }),
  ],
  exports: [RouterModule],
  providers: [CanLoadAuthGuard, CustomPreloadingStrategy],
})
export class AppRoutingModule {}
