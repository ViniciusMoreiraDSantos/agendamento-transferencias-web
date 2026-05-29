import { Injectable, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

export interface TransferenciaRequest {
  contaOrigem: string;
  contaDestino: string;
  valor: number;
  dataTransferencia: string;
}

export interface TransferenciaResponse {
  id: number;
  contaOrigem: string;
  contaDestino: string;
  valor: number;
  taxa: number;
  dataTransferencia: string;
  dataAgendamento: string;
}

@Injectable({ providedIn: 'root' })
export class TransferenciaService {
  private readonly http = inject(HttpClient);
  private apiUrl = 'http://localhost:8080/api/transferencias';

  agendar(request: TransferenciaRequest): Observable<TransferenciaResponse> {
    return this.http.post<TransferenciaResponse>(this.apiUrl, request);
  }

  listarTodos(): Observable<TransferenciaResponse[]> {
    return this.http.get<TransferenciaResponse[]>(this.apiUrl);
  }
}
