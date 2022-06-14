import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { Kanban } from '../model/kanban';

@Injectable({
  providedIn: 'root'
})
export class KanbanService {

  constructor(private http: HttpClient) { }

  listar(): Observable<Kanban[]> {
    return this.http.get<Kanban[]>(`${environment.apiEndpoint}/kanban`);
  }

  inserir(kanban: Kanban): Observable<Kanban> {
    return this.http.post<Kanban>(`${environment.apiEndpoint}/kanban`, kanban)
  }

  remover(id: number): Observable<any> {
    return this.http.delete(`${environment.apiEndpoint}/kanban/${id}`);
  }

  atualizar(kanban: Kanban): Observable<Kanban> {
    return this.http.put<Kanban>(`${environment.apiEndpoint}/kanban/${kanban.id}`, kanban);
  }
}
