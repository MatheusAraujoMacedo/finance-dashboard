import React, { useState } from "react";
import { AreaChart, Area, XAxis, YAxis, Tooltip, ResponsiveContainer, BarChart, Bar, Legend, CartesianGrid } from "recharts";

// Mock icons (inline SVG) to avoid external deps
const IconWallet = ({ className = "w-6 h-6" }) => (
  <svg className={className} viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path d="M3 7h16v10H3z" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
    <path d="M21 7v2" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
  </svg>
);
const IconSend = ({ className = "w-5 h-5" }) => (
  <svg className={className} viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path d="M22 2L11 13" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
    <path d="M22 2l-7 20  -3-9-9-3 19-8z" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
  </svg>
);

const mockBalance = {
  total: 12450.75,
  accounts: [
    { id: 1, name: "Conta Corrente", balance: 8450.5 },
    { id: 2, name: "Poupança", balance: 3000.0 },
    { id: 3, name: "Investimentos", balance: 1000.25 },
  ],
};

const mockChart = [
  { month: "Jan", value: 800 },
  { month: "Fev", value: 950 },
  { month: "Mar", value: 1200 },
  { month: "Abr", value: 1100 },
  { month: "Mai", value: 1400 },
  { month: "Jun", value: 1250 },
  { month: "Jul", value: 1500 },
  { month: "Ago", value: 1700 },
  { month: "Set", value: 1600 },
  { month: "Out", value: 1800 },
  { month: "Nov", value: 2000 },
  { month: "Dez", value: 2100 },
];

const mockTransactions = [
  { id: 1, date: "2025-11-10", title: "Pagamento cliente X", amount: 2500, type: "entrada" },
  { id: 2, date: "2025-11-09", title: "Compra licensa SaaS", amount: -120, type: "saida" },
  { id: 3, date: "2025-11-08", title: "Aluguel escritório", amount: -950, type: "saida" },
  { id: 4, date: "2025-11-07", title: "Venda componente", amount: 320, type: "entrada" },
  { id: 5, date: "2025-11-06", title: "Assinatura", amount: -29.9, type: "saida" },
];

export default function FinanceDashboard() {
  const [transactions, setTransactions] = useState(mockTransactions);
  const [query, setQuery] = useState("");
  const [showAdd, setShowAdd] = useState(false);
  const [newTx, setNewTx] = useState({ date: "", title: "", amount: 0 });

  function handleAddTransaction(e) {
    e.preventDefault();
    const tx = {
      id: Date.now(),
      date: newTx.date || new Date().toISOString().slice(0, 10),
      title: newTx.title || "Sem título",
      amount: Number(newTx.amount),
      type: Number(newTx.amount) >= 0 ? "entrada" : "saida",
    };
    setTransactions((s) => [tx, ...s]);
    setShowAdd(false);
    setNewTx({ date: "", title: "", amount: 0 });
  }

  const filtered = transactions.filter((t) =>
    t.title.toLowerCase().includes(query.toLowerCase()) || t.date.includes(query)
  );

  return (
    <div className="min-h-screen bg-gray-50 p-6">
      <header className="max-w-7xl mx-auto mb-6 flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-semibold">Dashboard Financeiro</h1>
          <p className="text-sm text-gray-500">Projeto para portfólio — controle rápido de receitas e despesas</p>
        </div>
        <div className="flex items-center gap-3">
          <button className="bg-white px-3 py-2 rounded shadow-sm text-sm">Exportar CSV</button>
          <button
            onClick={() => setShowAdd(true)}
            className="bg-indigo-600 text-white px-4 py-2 rounded shadow hover:bg-indigo-700 flex items-center gap-2"
          >
            <IconSend className="w-4 h-4" />
            Nova transação
          </button>
        </div>
      </header>

      <main className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Left: Cards + Chart */}
        <section className="lg:col-span-2 space-y-6">
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            <div className="bg-white p-4 rounded shadow">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-gray-500">Saldo total</p>
                  <p className="text-xl font-semibold">R$ {mockBalance.total.toFixed(2).replace('.', ',')}</p>
                </div>
                <div className="p-2 bg-gray-100 rounded">
                  <IconWallet />
                </div>
              </div>
            </div>

            {mockBalance.accounts.map((a) => (
              <div key={a.id} className="bg-white p-4 rounded shadow">
                <p className="text-sm text-gray-500">{a.name}</p>
                <p className="text-lg font-medium">R$ {a.balance.toFixed(2).replace('.', ',')}</p>
              </div>
            ))}
          </div>

          <div className="bg-white p-4 rounded shadow">
            <h2 className="text-lg font-semibold mb-2">Fluxo mensal</h2>
            <div style={{ height: 240 }}>
              <ResponsiveContainer width="100%" height="100%">
                <AreaChart data={mockChart} margin={{ top: 10, right: 30, left: 0, bottom: 0 }}>
                  <defs>
                    <linearGradient id="colorValue" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="5%" stopColor="#7c3aed" stopOpacity={0.8} />
                      <stop offset="95%" stopColor="#7c3aed" stopOpacity={0.05} />
                    </linearGradient>
                  </defs>
                  <XAxis dataKey="month" />
                  <YAxis />
                  <Tooltip formatter={(v) => `R$ ${v}`} />
                  <Area type="monotone" dataKey="value" stroke="#7c3aed" fillOpacity={1} fill="url(#colorValue)" />
                </AreaChart>
              </ResponsiveContainer>
            </div>
          </div>

          <div className="bg-white p-4 rounded shadow">
            <h2 className="text-lg font-semibold mb-2">Resumo por categoria (exemplo)</h2>
            <div style={{ height: 220 }}>
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={[{ name: 'Receitas', v: 8000 }, { name: 'Despesas', v: 3200 }, { name: 'Invest', v: 1200 }]}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="name" />
                  <YAxis />
                  <Tooltip />
                  <Legend />
                  <Bar dataKey="v" fill="#4f46e5" />
                </BarChart>
              </ResponsiveContainer>
            </div>
          </div>
        </section>

        {/* Right: Transactions */}
        <aside className="space-y-4">
          <div className="bg-white p-4 rounded shadow">
            <div className="flex items-center justify-between mb-3">
              <h3 className="font-semibold">Transações</h3>
              <input
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                placeholder="Pesquisar..."
                className="border px-2 py-1 rounded text-sm"
              />
            </div>

            <div className="space-y-2">
              {filtered.map((t) => (
                <div key={t.id} className="flex items-center justify-between">
                  <div>
                    <p className="text-sm font-medium">{t.title}</p>
                    <p className="text-xs text-gray-500">{t.date}</p>
                  </div>
                  <div className={`text-sm font-semibold ${t.amount >= 0 ? 'text-green-600' : 'text-red-600'}`}>
                    {t.amount >= 0 ? '+' : ''}R$ {Math.abs(t.amount).toFixed(2).replace('.', ',')}
                  </div>
                </div>
              ))}
              {filtered.length === 0 && <p className="text-sm text-gray-500">Nenhuma transação encontrada.</p>}
            </div>

            <div className="mt-4 flex justify-end">
              <button onClick={() => setShowAdd(true)} className="text-sm px-3 py-1 bg-gray-100 rounded">Adicionar</button>
            </div>
          </div>

          <div className="bg-white p-4 rounded shadow">
            <h3 className="font-semibold mb-2">Metas</h3>
            <div className="space-y-3">
              <div>
                <p className="text-sm text-gray-500">Fundo de emergência</p>
                <div className="w-full bg-gray-100 rounded-full h-3 mt-1 overflow-hidden">
                  <div className="h-3 rounded-full" style={{ width: '60%', background: 'linear-gradient(90deg,#7c3aed,#4f46e5)' }} />
                </div>
                <p className="text-xs mt-1">R$ 6.000 de R$ 10.000</p>
              </div>

              <div>
                <p className="text-sm text-gray-500">Reserva para viagens</p>
                <div className="w-full bg-gray-100 rounded-full h-3 mt-1 overflow-hidden">
                  <div className="h-3 rounded-full" style={{ width: '30%', background: 'linear-gradient(90deg,#06b6d4,#06b6d4)' }} />
                </div>
                <p className="text-xs mt-1">R$ 900 de R$ 3.000</p>
              </div>
            </div>
          </div>

          <div className="bg-white p-4 rounded shadow">
            <h3 className="font-semibold mb-2">Ações rápidas</h3>
            <div className="flex flex-col gap-2">
              <button className="text-sm px-3 py-2 bg-green-50 rounded">Receber pagamento</button>
              <button className="text-sm px-3 py-2 bg-red-50 rounded">Pagar conta</button>
              <button className="text-sm px-3 py-2 bg-yellow-50 rounded">Transferir</button>
            </div>
          </div>
        </aside>
      </main>

      {/* Add modal simple */}
      {showAdd && (
        <div className="fixed inset-0 bg-black/30 flex items-center justify-center p-4">
          <form onSubmit={handleAddTransaction} className="bg-white rounded p-4 w-full max-w-md space-y-3">
            <h4 className="font-semibold">Nova transação</h4>
            <div className="grid grid-cols-1 gap-2">
              <label className="text-sm">Data
                <input type="date" value={newTx.date} onChange={(e) => setNewTx({ ...newTx, date: e.target.value })} className="block w-full border px-2 py-1 rounded mt-1" />
              </label>
              <label className="text-sm">Título
                <input value={newTx.title} onChange={(e) => setNewTx({ ...newTx, title: e.target.value })} className="block w-full border px-2 py-1 rounded mt-1" />
              </label>
              <label className="text-sm">Valor (use negativo para despesas)
                <input type="number" step="0.01" value={newTx.amount} onChange={(e) => setNewTx({ ...newTx, amount: e.target.value })} className="block w-full border px-2 py-1 rounded mt-1" />
              </label>
            </div>

            <div className="flex justify-end gap-2">
              <button type="button" onClick={() => setShowAdd(false)} className="px-3 py-1 rounded border">Cancelar</button>
              <button type="submit" className="px-3 py-1 rounded bg-indigo-600 text-white">Salvar</button>
            </div>
          </form>
        </div>
      )}

      <footer className="max-w-7xl mx-auto mt-8 text-sm text-gray-500">Feito para portfólio — personalize cores, dados e integração com API.</footer>
    </div>
  );
}
