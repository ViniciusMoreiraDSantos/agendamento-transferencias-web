import { Component, inject, signal, OnInit } from '@angular/core';
import { ReactiveFormsModule, FormBuilder, Validators } from '@angular/forms';
import { CommonModule, CurrencyPipe, DatePipe } from '@angular/common';
import { TransferenciaService, TransferenciaResponse } from './transferencia.service';

@Component({
  selector: 'app-root',
  imports: [ReactiveFormsModule, CommonModule, CurrencyPipe, DatePipe],
  templateUrl: './app.html',
  styleUrl: './app.css'
})
export class App implements OnInit {
  private fb = inject(FormBuilder);
  private readonly service = inject(TransferenciaService);

  transferencias = signal<TransferenciaResponse[]>([]);
  sucesso = signal(false);
  erro = signal('');

  form = this.fb.group({
    contaOrigem: ['', [Validators.required, Validators.pattern(/^\d{10}$/)]],
    contaDestino: ['', [Validators.required, Validators.pattern(/^\d{10}$/)]],
    valor: [null as number | null, [Validators.required, Validators.min(0.01)]],
    dataTransferencia: ['', Validators.required]
  });

  ngOnInit(): void {
    this.carregarExtrato();
  }

  aoDigitarValor(evento: Event): void {
    const campo = evento.target as HTMLInputElement;
    const digtos = campo.value.replace(/\D/g, '');
    const centavos = parseInt(digtos || '0', 10);
    const valorNum = centavos / 100;
    campo.value = 'R$ ' + valorNum.toLocaleString('pt-BR', { minimumFractionDigits: 2, maximumFractionDigits: 2 });
    this.form.get('valor')?.setValue(valorNum > 0 ? valorNum : null, { emitEvent: false });
  }

  agendar(): void {
    if (this.form.invalid) return;

    const { contaOrigem, contaDestino, valor, dataTransferencia } = this.form.value;

    if (contaOrigem === contaDestino) {
      this.erro.set('Conta de origem e destino não podem ser iguais.');
      return;
    }

    this.erro.set('');
    this.sucesso.set(false);

    this.service.agendar({
      contaOrigem: contaOrigem!,
      contaDestino: contaDestino!,
      valor: valor!,
      dataTransferencia: dataTransferencia!
    }).subscribe({
      next: () => {
        this.sucesso.set(true);
        this.form.reset();
        this.carregarExtrato();
      },
      error: (err) => {
        const msg = err.error?.erro || err.error?.message || 'Erro ao agendar transferência.';
        this.erro.set(msg);
      }
    });
  }

  private carregarExtrato(): void {
    this.service.listarTodos().subscribe({
      next: (data) => this.transferencias.set(data),
      error: () => {}
    });
  }
}
