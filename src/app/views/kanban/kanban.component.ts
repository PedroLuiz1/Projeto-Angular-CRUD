import { Component, OnInit } from '@angular/core';
import { Kanban } from 'src/app/model/kanban';
import { KanbanService } from 'src/app/services/kanban.service';


@Component({
  selector: 'app-kanban',
  templateUrl: './kanban.component.html',
  styleUrls: ['./kanban.component.css']
})
export class KanbanComponent implements OnInit {
  kanbans = new Array<Kanban>();
  kanban?: Kanban;
  editando = false;

  colunas = ['nome', 'categoria', 'status', 'acoes'];

  constructor(private kanbanService: KanbanService) { }

  ngOnInit(): void {
    this.listar();
  }

  listar() {
    this.kanbanService.listar().subscribe(kanbans => {
      this.kanbans = kanbans;
    });
  }

  novo() {
    this.kanban = new Kanban();
    this.editando = false;
  }

  salvar() {
    if (this.kanban) {

      if (!this.editando) {
        this.kanbanService.inserir(this.kanban).subscribe(kanban => {
          this.listar();
          this.kanban = undefined;
        })
      }
      else {
        this.kanbanService.atualizar(this.kanban).subscribe(kanban => {
          this.listar();
          this.kanban = undefined;
        })
      }
    }
  }

  excluir(id: number) {
    this.kanbanService.remover(id).subscribe(() => {

      this.listar();

    });
  }

  editar(kanban: Kanban) {
    this.kanban = kanban;
    this.editando = true;
  }
}
