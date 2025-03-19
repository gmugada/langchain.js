import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AiChatComponent } from './features/components/ai-chat/ai-chat.component';


const routes: Routes = [
  { path: '', redirectTo: '/login', pathMatch: 'full' },
  { path: 'langchain', component: AiChatComponent }

];
@NgModule({
  imports: [RouterModule.forRoot(routes, { scrollPositionRestoration: 'enabled' })],
  exports: [RouterModule],
})
export class AppRoutingModule { }
