"use client";

import { useMemo, useState } from "react";

import {
  AlertIcon,
  ArrowIcon,
  BackIcon,
  CheckIcon,
  InboxIcon,
  SparkIcon,
  SunIcon,
  TagIcon,
} from "@/components/Icons";
import {
  CATALOG,
  TOP_QUESTIONS,
  UNKNOWN_QUESTIONS,
  YESTERDAY,
} from "@/data/prototype";

type Screen = "hoy" | "pendientes" | "ensenar" | "listo" | "catalogo";
type Mode = "mobile" | "desktop";

const money = (value: number) => `$${value.toLocaleString("es-CO")}`;

function TabBar({
  screen,
  pending,
  onGo,
  mode,
}: {
  screen: Screen;
  pending: number;
  onGo: (screen: Screen) => void;
  mode: Mode;
}) {
  const isSide = mode === "desktop";
  const tabs: { id: Screen; label: string; icon: React.ReactNode }[] = [
    { id: "hoy", label: "Hoy", icon: <SunIcon className="h-5 w-5" /> },
    {
      id: "pendientes",
      label: "Pendientes",
      icon: <InboxIcon className="h-5 w-5" />,
    },
    { id: "catalogo", label: "Catálogo", icon: <TagIcon className="h-5 w-5" /> },
  ];

  const active = screen === "ensenar" || screen === "listo" ? "pendientes" : screen;

  return (
    <nav
      className={
        isSide
          ? "flex w-[164px] shrink-0 flex-col gap-1 border-r border-hairline bg-white p-3"
          : "flex shrink-0 border-t border-hairline bg-white"
      }
    >
      {tabs.map((tab) => {
        const isActive = active === tab.id;

        return (
          <button
            key={tab.id}
            type="button"
            onClick={() => onGo(tab.id)}
            aria-current={isActive}
            className={`relative flex cursor-pointer items-center transition-colors ${
              isSide
                ? `gap-2.5 rounded-lg px-3 py-2.5 ${isActive ? "bg-accent-soft text-accent" : "text-ink-mute hover:bg-surface"}`
                : `flex-1 flex-col gap-1 py-2.5 ${isActive ? "text-accent" : "text-ink-faint hover:text-ink-mute"}`
            }`}
          >
            <span className="relative">
              {tab.icon}
              {tab.id === "pendientes" && pending > 0 && (
                <span className="num absolute -right-2 -top-1.5 flex h-4 min-w-4 items-center justify-center rounded-full bg-alert px-1 text-[0.58rem] font-bold text-white">
                  {pending}
                </span>
              )}
            </span>
            <span
              className={
                isSide ? "text-[0.82rem] font-bold" : "text-[0.62rem] font-bold"
              }
            >
              {tab.label}
            </span>
          </button>
        );
      })}
    </nav>
  );
}

export default function ProtoApp({
  onReset,
  mode,
}: {
  onReset: () => void;
  mode: Mode;
}) {
  const isDesktop = mode === "desktop";
  const [screen, setScreen] = useState<Screen>("hoy");
  const [openId, setOpenId] = useState<string | null>(null);
  const [answerId, setAnswerId] = useState<string | null>(null);
  const [price, setPrice] = useState("");
  const [days, setDays] = useState("");
  const [taught, setTaught] = useState<string[]>([]);
  const [restocked, setRestocked] = useState<string[]>([]);
  const [toast, setToast] = useState<string | null>(null);

  const pendingList = useMemo(
    () => UNKNOWN_QUESTIONS.filter((q) => !taught.includes(q.id)),
    [taught]
  );

  const open = UNKNOWN_QUESTIONS.find((q) => q.id === openId) ?? null;
  const answer = open?.answers.find((a) => a.id === answerId) ?? null;

  function go(next: Screen) {
    setScreen(next);
  }

  function openQuestion(id: string) {
    setOpenId(id);
    setAnswerId(null);
    setPrice("");
    setDays("");
    go("ensenar");
  }

  function teach() {
    if (!open || !answer) return;

    setTaught((prev) => [...prev, open.id]);
    go("listo");
  }

  function flashToast(message: string) {
    setToast(message);
    setTimeout(() => setToast(null), 2600);
  }

  function restock(id: string, name: string) {
    setRestocked((prev) => [...prev, id]);
    flashToast(`Listo. Ya estoy ofreciendo ${name.split(" ")[0].toLowerCase()} otra vez.`);
  }

  const answeredNow = YESTERDAY.answered + taught.length;

  return (
    <div className={`flex h-full bg-canvas ${isDesktop ? "flex-row" : "flex-col"}`}>
      {isDesktop && (
        <TabBar
          screen={screen}
          pending={pendingList.length}
          onGo={go}
          mode={mode}
        />
      )}

      <div className="relative flex min-w-0 flex-1 flex-col">
      <header className="flex shrink-0 items-center justify-between gap-3 border-b border-hairline bg-white px-4 py-3">
        <div className="flex items-center gap-2.5">
          <span className="flex h-8 w-8 items-center justify-center rounded-lg bg-accent text-white">
            <SparkIcon className="h-4 w-4" />
          </span>
          <div className="leading-tight">
            <p className="text-[0.82rem] font-extrabold text-ink">Mostrador</p>
            <p className="text-[0.62rem] text-ink-faint">Acuario Nébula</p>
          </div>
        </div>

        <span className="flex items-center gap-1.5 rounded-full border border-ok/30 bg-ok-soft px-2 py-0.5">
          <span className="h-1.5 w-1.5 animate-pulse-live rounded-full bg-ok" />
          <span className="text-[0.6rem] font-bold text-ok">atendiendo</span>
        </span>
      </header>

      <div key={screen} className="animate-slide-in flex-1 overflow-y-auto scroll-slim">
        <div className={isDesktop ? "mx-auto w-full max-w-[620px] py-4" : ""}>
        {screen === "hoy" && (
          <div className="flex flex-col gap-3 p-4">
            <div>
              <p className="text-[0.72rem] font-semibold uppercase tracking-wide text-ink-faint">
                Martes, 9:14 a. m.
              </p>
              <h1 className="text-[1.35rem] font-extrabold leading-tight text-ink">
                Buenos días, Daniela.
              </h1>
            </div>

            <div className="rounded-[14px] border border-accent bg-accent p-4 text-white">
              <p className="text-[0.8rem] font-medium text-white/80">
                Ayer respondí por ti
              </p>
              <p className="num mt-1 text-4xl font-extrabold leading-none">
                {answeredNow}
                <span className="text-lg font-bold text-white/50">
                  /{YESTERDAY.total}
                </span>
              </p>
              <p className="mt-2 text-[0.8rem] leading-snug text-white/85">
                Son unos <strong>{YESTERDAY.minutesSaved} minutos</strong> que no
                gastaste. {YESTERDAY.afterHours} fueron después de que cerraste.
              </p>
            </div>

            {pendingList.length > 0 ? (
              <button
                type="button"
                onClick={() => go("pendientes")}
                className="rounded-[14px] border flex w-full cursor-pointer items-center gap-3 border-alert/40 bg-alert-soft p-4 text-left transition-colors hover:border-alert"
              >
                <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg bg-alert text-white">
                  <AlertIcon className="h-5 w-5" />
                </span>
                <div className="min-w-0 flex-1">
                  <p className="text-[0.85rem] font-bold text-ink">
                    {pendingList.length === 1
                      ? "1 cosa que no supe responder"
                      : `${pendingList.length} cosas que no supe responder`}
                  </p>
                  <p className="text-[0.74rem] leading-snug text-ink-mute">
                    Enséñamelas y no vuelvo a fallar.
                  </p>
                </div>
                <ArrowIcon className="h-4 w-4 shrink-0 text-alert" />
              </button>
            ) : (
              <div className="rounded-[14px] border flex items-center gap-3 border-ok/40 bg-ok-soft p-4">
                <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg bg-ok text-white">
                  <CheckIcon className="h-5 w-5" />
                </span>
                <div>
                  <p className="text-[0.85rem] font-bold text-ink">
                    Ya sé todo lo de ayer.
                  </p>
                  <p className="text-[0.74rem] text-ink-mute">
                    No quedó ninguna pregunta sin responder.
                  </p>
                </div>
              </div>
            )}

            <div className="rounded-[14px] border border-hairline bg-white p-4">
              <p className="text-[0.7rem] font-bold uppercase tracking-wide text-ink-faint">
                Lo que más te preguntaron
              </p>
              <ul className="mt-2 flex flex-col gap-2">
                {TOP_QUESTIONS.map((item) => (
                  <li
                    key={item.question}
                    className="flex items-center justify-between gap-3"
                  >
                    <span className="text-[0.8rem] text-ink">{item.question}</span>
                    <span className="num shrink-0 rounded-md bg-surface px-1.5 py-0.5 text-[0.68rem] font-bold text-ink-mute">
                      {item.times}×
                    </span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        )}

        {screen === "pendientes" && (
          <div className="flex flex-col gap-3 p-4">
            <div>
              <h1 className="text-[1.2rem] font-extrabold leading-tight text-ink">
                Lo que no supe
              </h1>
              <p className="text-[0.78rem] leading-snug text-ink-mute">
                Cada una es un cliente que se quedó esperando. Respóndeme una vez
                y ya lo sé para siempre.
              </p>
            </div>

            {pendingList.length === 0 ? (
              <div className="rounded-[14px] border border-hairline bg-white flex flex-col items-center gap-2 p-8 text-center">
                <span className="flex h-12 w-12 items-center justify-center rounded-full bg-ok-soft text-ok">
                  <CheckIcon className="h-6 w-6" />
                </span>
                <p className="text-[0.9rem] font-bold text-ink">
                  No queda nada pendiente.
                </p>
                <p className="text-[0.78rem] leading-snug text-ink-mute">
                  Te avisaré apenas alguien pregunte algo que no sepa.
                </p>
              </div>
            ) : (
              pendingList.map((item) => (
                <button
                  key={item.id}
                  type="button"
                  onClick={() => openQuestion(item.id)}
                  className="rounded-[14px] border border-hairline bg-white flex cursor-pointer items-center gap-3 p-4 text-left transition-colors hover:border-accent"
                >
                  <div className="min-w-0 flex-1">
                    <p className="text-[0.88rem] font-bold text-ink">
                      {item.question}
                    </p>
                    <p className="mt-0.5 text-[0.72rem] text-ink-mute">
                      {item.askedBy} · {item.askedAt}
                    </p>
                  </div>

                  <div className="flex shrink-0 items-center gap-2">
                    {item.times > 1 && (
                      <span className="num rounded-md bg-alert-soft px-1.5 py-0.5 text-[0.66rem] font-bold text-alert">
                        {item.times}×
                      </span>
                    )}
                    <ArrowIcon className="h-4 w-4 text-ink-faint" />
                  </div>
                </button>
              ))
            )}
          </div>
        )}

        {screen === "ensenar" && open && (
          <div className="flex flex-col gap-3 p-4">
            <button
              type="button"
              onClick={() => go("pendientes")}
              className="flex w-fit cursor-pointer items-center gap-1 text-[0.76rem] font-bold text-ink-mute transition-colors hover:text-ink"
            >
              <BackIcon className="h-4 w-4" />
              Pendientes
            </button>

            <h1 className="text-[1.15rem] font-extrabold leading-tight text-ink">
              {open.question}
            </h1>

            <div className="rounded-[14px] border border-hairline bg-surface p-3.5">
              <p className="text-[0.7rem] font-bold uppercase tracking-wide text-ink-faint">
                Esto fue lo que le dije a {open.askedBy}
              </p>
              <p className="mt-1.5 rounded-lg border border-hairline bg-white px-3 py-2 text-[0.78rem] italic leading-snug text-ink-mute">
                “{open.whatBotSaid}”
              </p>
              <p className="mt-2 text-[0.72rem] font-semibold text-alert">
                {open.times > 1
                  ? `Te lo preguntaron ${open.times} veces. Ninguna supe qué decir.`
                  : "Preferí no inventar. Pero perdimos la conversación."}
              </p>
            </div>

            <div>
              <p className="text-[0.8rem] font-bold text-ink">
                ¿Qué le respondo la próxima vez?
              </p>

              <div className="mt-2 flex flex-col gap-2">
                {open.answers.map((option) => {
                  const isPicked = answerId === option.id;

                  return (
                    <button
                      key={option.id}
                      type="button"
                      onClick={() => setAnswerId(option.id)}
                      className={`flex cursor-pointer items-center gap-2.5 rounded-xl border px-3.5 py-3 text-left transition-all ${
                        isPicked
                          ? "border-accent bg-accent-soft"
                          : "border-hairline bg-white hover:border-hairline-strong"
                      }`}
                    >
                      <span
                        className={`flex h-4 w-4 shrink-0 items-center justify-center rounded-full border-2 ${
                          isPicked
                            ? "border-accent bg-accent"
                            : "border-hairline-strong"
                        }`}
                      >
                        {isPicked && (
                          <span className="h-1.5 w-1.5 rounded-full bg-white" />
                        )}
                      </span>
                      <span className="text-[0.84rem] font-semibold text-ink">
                        {option.label}
                      </span>
                    </button>
                  );
                })}
              </div>
            </div>

            {answer?.needsPrice && (
              <div className="animate-fade-up flex gap-2">
                <label className="flex flex-1 flex-col gap-1">
                  <span className="text-[0.7rem] font-bold text-ink-mute">
                    Precio
                  </span>
                  <input
                    inputMode="numeric"
                    value={price}
                    onChange={(event) => setPrice(event.target.value)}
                    placeholder="90.000"
                    className="num w-full rounded-lg border border-hairline-strong bg-white px-3 py-2 text-[0.85rem] outline-none transition-colors focus:border-accent"
                  />
                </label>

                {answer.needsDays && (
                  <label className="flex w-24 flex-col gap-1">
                    <span className="text-[0.7rem] font-bold text-ink-mute">
                      Días
                    </span>
                    <input
                      inputMode="numeric"
                      value={days}
                      onChange={(event) => setDays(event.target.value)}
                      placeholder="15"
                      className="num w-full rounded-lg border border-hairline-strong bg-white px-3 py-2 text-[0.85rem] outline-none transition-colors focus:border-accent"
                    />
                  </label>
                )}
              </div>
            )}

            <button
              type="button"
              onClick={teach}
              disabled={!answer}
              className="mt-1 flex cursor-pointer items-center justify-center gap-2 rounded-xl bg-accent px-5 py-3.5 text-[0.9rem] font-bold text-white transition-colors hover:bg-accent-hover disabled:cursor-not-allowed disabled:opacity-40"
            >
              <SparkIcon className="h-4 w-4" />
              Enseñárselo al asistente
            </button>
          </div>
        )}

        {screen === "listo" && open && answer && (
          <div className="flex flex-col gap-4 p-4">
            <div className="animate-pop flex flex-col items-center gap-2 pt-4 text-center">
              <span className="flex h-14 w-14 items-center justify-center rounded-full bg-ok text-white">
                <CheckIcon className="h-7 w-7" />
              </span>
              <h1 className="text-[1.3rem] font-extrabold leading-tight text-ink">
                Listo. Ya lo sé.
              </h1>
              <p className="max-w-[260px] text-[0.8rem] leading-snug text-ink-mute">
                Me lo enseñaste una vez. No lo vuelvo a preguntar.
              </p>
            </div>

            <div className="rounded-[14px] border border-hairline bg-white overflow-hidden">
              <p className="border-b border-hairline bg-surface px-3.5 py-2 text-[0.66rem] font-bold uppercase tracking-wide text-ink-faint">
                Así voy a responder ahora
              </p>

              <div className="flex flex-col gap-2 p-3.5">
                <div className="ml-auto max-w-[85%] rounded-2xl rounded-br-sm bg-accent px-3 py-2 text-[0.78rem] text-white">
                  {open.question}
                </div>
                <div className="max-w-[92%] rounded-2xl rounded-bl-sm border border-hairline bg-surface px-3 py-2 text-[0.78rem] leading-snug text-ink">
                  {answer.botReply(price || undefined, days || undefined)}
                </div>
              </div>
            </div>

            {open.times > 1 && (
              <div className="rounded-[14px] border border-accent/30 bg-accent-soft p-3.5">
                <p className="text-[0.78rem] leading-snug text-ink">
                  <strong>Ya le escribí a {open.askedBy}.</strong> Te preguntó
                  esto {open.times} veces y se quedó sin respuesta. Ahora sí la
                  tiene.
                </p>
              </div>
            )}

            <button
              type="button"
              onClick={() => go("pendientes")}
              className="flex cursor-pointer items-center justify-center gap-2 rounded-xl bg-ink px-5 py-3.5 text-[0.88rem] font-bold text-white transition-opacity hover:opacity-90"
            >
              {pendingList.length > 0
                ? `Enseñarme lo siguiente (${pendingList.length})`
                : "Volver a pendientes"}
            </button>
          </div>
        )}

        {screen === "catalogo" && (
          <div className="flex flex-col gap-3 p-4">
            <div>
              <h1 className="text-[1.2rem] font-extrabold leading-tight text-ink">
                Tu catálogo
              </h1>
              <p className="text-[0.78rem] leading-snug text-ink-mute">
                Esto es lo único que puedo decirle a tus clientes. Nada más.
              </p>
            </div>

            {CATALOG.map((item) => {
              const isBack = restocked.includes(item.id);
              const status = isBack ? "disponible" : item.status;
              const isOut = status === "agotado";

              return (
                <div
                  key={item.id}
                  className={`rounded-[14px] border p-3.5 transition-colors ${
                    isOut
                      ? "border-alert/40 bg-alert-soft"
                      : "border-hairline bg-white"
                  }`}
                >
                  <div className="flex items-start justify-between gap-3">
                    <div className="min-w-0 flex-1">
                      <p className="text-[0.84rem] font-bold leading-snug text-ink">
                        {item.name}
                      </p>
                      <p className="mt-0.5 text-[0.7rem] text-ink-faint">
                        {isBack ? "Lo marcaste disponible hoy" : item.note}
                      </p>
                    </div>

                    <div className="flex shrink-0 flex-col items-end gap-1">
                      <span className="num text-[0.9rem] font-extrabold text-ink">
                        {money(item.price)}
                      </span>
                      <span
                        className={`rounded-full px-2 py-0.5 text-[0.58rem] font-bold uppercase tracking-wide ${
                          isOut ? "bg-alert text-white" : "bg-ok-soft text-ok"
                        }`}
                      >
                        {status}
                      </span>
                    </div>
                  </div>

                  {isOut && (
                    <button
                      type="button"
                      onClick={() => restock(item.id, item.name)}
                      className="mt-3 w-full cursor-pointer rounded-lg bg-alert px-3 py-2 text-[0.76rem] font-bold text-white transition-opacity hover:opacity-90"
                    >
                      Ya me llegó — márcalo disponible
                    </button>
                  )}
                </div>
              );
            })}

            <button
              type="button"
              onClick={onReset}
              className="mt-1 cursor-pointer rounded-xl border border-dashed border-hairline-strong px-4 py-3 text-[0.78rem] font-semibold text-ink-mute transition-colors hover:border-accent hover:text-accent"
            >
              Actualizar precios pegando la lista del proveedor
            </button>
          </div>
        )}
        </div>
      </div>

      {toast && (
        <div
          role="status"
          className="animate-fade-up absolute inset-x-4 bottom-20 z-10 rounded-xl bg-ink px-4 py-3 text-[0.78rem] font-semibold text-white shadow-lg"
        >
          {toast}
        </div>
      )}

      {!isDesktop && (
        <TabBar
          screen={screen}
          pending={pendingList.length}
          onGo={go}
          mode={mode}
        />
      )}
      </div>
    </div>
  );
}
