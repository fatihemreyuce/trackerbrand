import {
  Search,
  Bell,
  Inbox,
  CalendarDays,
  Columns3,
  Users,
  Settings,
  CircleDot,
  Circle,
  Plus,
  MoreHorizontal,
  Paperclip,
  MessageSquare,
  Tag,
  Clock,
  ChevronRight,
  Check,
  Flag,
} from "lucide-react";

/* ---------- shared chrome ---------- */

function MockChrome({ children, path }: { children: React.ReactNode; path: string }) {
  return (
    <div className="relative h-full w-full overflow-hidden rounded-xl bg-paper border border-hairline-soft flex flex-col">
      {/* top app bar */}
      <div className="flex items-center justify-between px-4 py-2.5 border-b border-hairline-soft bg-paper-soft">
        <div className="flex items-center gap-2">
          <span
            aria-hidden
            className="w-2.5 h-2.5 rounded-full bg-[linear-gradient(135deg,var(--color-ochre),var(--color-clay))] shadow-[0_0_10px_rgba(184,134,11,0.5)]"
          />
          <span className="text-[11px] font-semibold text-ink tracking-tight">Tracker</span>
          <span className="text-[10px] text-ink-mute ml-2">/ {path}</span>
        </div>
        <div className="flex items-center gap-2">
          <div className="hidden md:flex items-center gap-2 px-2.5 py-1 rounded-md bg-paper border border-hairline-soft text-[10px] text-ink-mute">
            <Search className="w-3 h-3" aria-hidden />
            Ara...
            <span className="ml-2 px-1 rounded bg-paper-deeper text-[9px] tabular-nums">⌘K</span>
          </div>
          <Bell className="w-3.5 h-3.5 text-ink-soft" aria-hidden />
          <div className="w-5 h-5 rounded-full bg-ochre-soft ring-1 ring-ochre/40 grid place-items-center text-[9px] font-bold text-ochre-deep">
            FE
          </div>
        </div>
      </div>
      <div className="flex-1 flex overflow-hidden">{children}</div>
    </div>
  );
}

function Sidebar({ active }: { active: string }) {
  const items = [
    { key: "today", label: "Bugün", Icon: Inbox },
    { key: "sprint", label: "Sprint #12", Icon: CalendarDays },
    { key: "kanban", label: "Kanban", Icon: Columns3 },
    { key: "team", label: "Takım", Icon: Users },
    { key: "settings", label: "Ayarlar", Icon: Settings },
  ];
  return (
    <aside className="w-32 md:w-40 shrink-0 border-r border-hairline-soft bg-paper-soft/50 px-2 py-3 hidden sm:flex flex-col gap-0.5">
      <p className="text-[9px] uppercase tracking-[0.12em] text-ink-mute font-semibold px-2 mb-1.5">
        Workspace
      </p>
      {items.map(({ key, label, Icon }) => {
        const isActive = active === key;
        return (
          <div
            key={key}
            className={`flex items-center gap-2 px-2 py-1.5 rounded-md text-[11px] ${
              isActive ? "bg-ink text-paper font-semibold" : "text-ink-soft"
            }`}
          >
            <Icon className="w-3 h-3 shrink-0" aria-hidden />
            {label}
          </div>
        );
      })}
      <div className="mt-auto pt-3 border-t border-hairline-soft">
        <div className="flex items-center gap-2 px-2 py-1.5 text-[10px] text-ink-mute">
          <span className="w-1.5 h-1.5 rounded-full bg-ochre animate-[pulse-soft_3s_ease-in-out_infinite]" />
          7 kişi çevrimiçi
        </div>
      </div>
    </aside>
  );
}

/* ---------- dashboard ---------- */

const todayTasks = [
  { icon: CircleDot, iconClass: "text-clay", title: "Auth flow düzeltmesi", meta: "2 saat · @sen", badge: "P1", badgeClass: "bg-clay-soft text-clay" },
  { icon: Circle, iconClass: "text-ink-mute", title: "Sprint planning toplantısı", meta: "14:00 · 30 dk", badge: "TOPLANTI", badgeClass: "bg-paper-deeper text-ink-soft" },
  { icon: CircleDot, iconClass: "text-ochre", title: "PR review: dashboard kanban", meta: "@ali bekliyor", badge: null, badgeClass: "" },
  { icon: CircleDot, iconClass: "text-ochre", title: "Mail bildirim cron'u test et", meta: "@sen", badge: null, badgeClass: "" },
];

export function DashboardMock() {
  return (
    <MockChrome path="bugün">
      <Sidebar active="today" />
      <div className="flex-1 grid grid-cols-1 lg:grid-cols-[1fr_180px] gap-3 p-4 overflow-hidden">
        <div className="flex flex-col gap-3 min-w-0">
          <div className="flex items-baseline justify-between">
            <div>
              <p className="text-[10px] uppercase tracking-[0.12em] text-ink-mute font-semibold">
                Salı, 14 Mart
              </p>
              <h4 className="text-sm md:text-base font-semibold text-ink tracking-tight">
                Merhaba Fatih 👋
              </h4>
            </div>
            <span className="inline-flex items-center gap-1 text-[10px] font-medium text-ochre-deep bg-ochre-soft px-2 py-1 rounded-full">
              <Flag className="w-2.5 h-2.5" aria-hidden />4 görev
            </span>
          </div>
          <div className="space-y-1.5 overflow-hidden">
            {todayTasks.map((t, i) => (
              <div
                key={t.title}
                className="flex items-center gap-2.5 rounded-md border border-hairline-soft bg-paper-soft px-2.5 py-2"
              >
                <t.icon
                  className={`w-3.5 h-3.5 shrink-0 ${t.iconClass} ${i === 0 ? "animate-[pulse-soft_2.5s_ease-in-out_infinite]" : ""}`}
                  aria-hidden
                />
                <div className="flex-1 min-w-0">
                  <p className="text-[11px] font-medium text-ink truncate">{t.title}</p>
                  <p className="text-[9px] text-ink-mute">{t.meta}</p>
                </div>
                {t.badge && (
                  <span className={`text-[8px] font-bold tracking-wider px-1.5 py-0.5 rounded ${t.badgeClass}`}>
                    {t.badge}
                  </span>
                )}
              </div>
            ))}
          </div>
        </div>
        <div className="hidden lg:flex flex-col gap-3 min-w-0">
          <div className="rounded-md bg-paper-soft border border-hairline-soft p-3">
            <p className="text-[9px] uppercase tracking-[0.1em] text-ink-mute font-semibold mb-1.5">
              Sprint #12
            </p>
            <p className="text-[10px] text-ink mb-2 tabular-nums">17 / 25 görev · 4 gün</p>
            <div className="h-1.5 rounded-full bg-paper-deeper overflow-hidden">
              <div
                className="h-full rounded-full bg-[linear-gradient(90deg,var(--color-ochre),var(--color-clay))]"
                style={{ width: "68%" }}
              />
            </div>
          </div>
          <div className="rounded-md bg-paper-soft border border-hairline-soft p-3">
            <p className="text-[9px] uppercase tracking-[0.1em] text-ink-mute font-semibold mb-2">
              Takım kapasitesi
            </p>
            {[
              { name: "Ali", load: 80 },
              { name: "Zeynep", load: 55 },
              { name: "Mert", load: 90 },
            ].map((m) => (
              <div key={m.name} className="mb-1.5 last:mb-0">
                <div className="flex justify-between text-[9px] text-ink-soft mb-0.5">
                  <span>{m.name}</span>
                  <span className="tabular-nums">{m.load}%</span>
                </div>
                <div className="h-1 rounded-full bg-paper-deeper overflow-hidden">
                  <div
                    className={`h-full rounded-full ${m.load >= 85 ? "bg-clay" : "bg-ochre"}`}
                    style={{ width: `${m.load}%` }}
                  />
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </MockChrome>
  );
}

/* ---------- kanban ---------- */

const kanbanCols = [
  {
    title: "Backlog",
    color: "bg-ink-mute",
    count: 5,
    cards: [
      { t: "OAuth provider seçimi", a: "ZA", p: "P2", pClass: "text-ochre" },
      { t: "Onboarding e-mail copy", a: "ME", p: null, pClass: "" },
    ],
  },
  {
    title: "Yapılıyor",
    color: "bg-ochre",
    count: 3,
    cards: [
      { t: "Auth flow düzeltmesi", a: "FE", p: "P1", pClass: "text-clay" },
      { t: "Sprint sayfası rework", a: "AL", p: "P2", pClass: "text-ochre" },
    ],
  },
  {
    title: "Review",
    color: "bg-clay",
    count: 2,
    cards: [
      { t: "Mail bildirim cron'u", a: "ME", p: "P1", pClass: "text-clay" },
    ],
  },
  {
    title: "Tamamlandı",
    color: "bg-ochre-deep",
    count: 8,
    cards: [
      { t: "Login rate-limit", a: "FE", p: null, pClass: "" },
      { t: "Workspace seed", a: "AL", p: null, pClass: "" },
    ],
  },
];

export function KanbanMock() {
  return (
    <MockChrome path="kanban">
      <Sidebar active="kanban" />
      <div className="flex-1 p-3 sm:overflow-hidden">
        <div className="grid grid-cols-2 gap-2 sm:grid-cols-4 sm:h-full">
          {kanbanCols.map((col) => (
            <div key={col.title} className="flex flex-col min-w-0">
              <div className="flex items-center justify-between mb-2 px-1">
                <div className="flex items-center gap-1.5 min-w-0">
                  <span className={`w-2 h-2 rounded-full ${col.color} shrink-0`} aria-hidden />
                  <span className="text-[10px] font-semibold text-ink truncate">{col.title}</span>
                  <span className="text-[9px] text-ink-mute tabular-nums">{col.count}</span>
                </div>
                <Plus className="w-3 h-3 text-ink-mute shrink-0" aria-hidden />
              </div>
              <div className="space-y-1.5 overflow-hidden">
                {col.cards.map((c) => (
                  <div
                    key={c.t}
                    className="rounded-md bg-paper-soft border border-hairline-soft p-2 hover:border-ochre/30 transition-colors"
                  >
                    <p className="text-[10px] font-medium text-ink leading-snug mb-1.5">{c.t}</p>
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-1">
                        {c.p && (
                          <span className={`text-[8px] font-bold ${c.pClass}`}>{c.p}</span>
                        )}
                        <Paperclip className="w-2.5 h-2.5 text-ink-mute" aria-hidden />
                      </div>
                      <div className="w-4 h-4 rounded-full bg-ochre-soft ring-1 ring-ochre/40 grid place-items-center text-[8px] font-bold text-ochre-deep">
                        {c.a}
                      </div>
                    </div>
                  </div>
                ))}
                <div className="rounded-md border border-dashed border-hairline-soft py-1.5 text-center text-[9px] text-ink-mute">
                  + Görev ekle
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </MockChrome>
  );
}

/* ---------- sprint board ---------- */

type SprintTask = {
  t: string;
  a: string;
  sp: number;
  p?: "P0" | "P1" | "P2";
};

const sprintGroups: Array<{
  title: string;
  status: "doing" | "review" | "done";
  count: number;
  shown: number;
  tasks: SprintTask[];
}> = [
  {
    title: "Yapılıyor",
    status: "doing",
    count: 3,
    shown: 3,
    tasks: [
      { t: "Auth flow düzeltmesi: refresh token süresi", a: "FE", sp: 5, p: "P1" },
      { t: "Sprint sayfası rework — burndown ekle", a: "AL", sp: 3, p: "P2" },
      { t: "Webhook router retry/backoff", a: "ME", sp: 2 },
    ],
  },
  {
    title: "Review",
    status: "review",
    count: 2,
    shown: 2,
    tasks: [
      { t: "Mail bildirim cron'u — stale digest", a: "ME", sp: 3, p: "P1" },
      { t: "ESLint hot path düzeltmesi", a: "AL", sp: 1 },
    ],
  },
  {
    title: "Tamamlandı",
    status: "done",
    count: 8,
    shown: 3,
    tasks: [
      { t: "Login rate-limit middleware", a: "FE", sp: 2 },
      { t: "Workspace seed komutu", a: "AL", sp: 1 },
      { t: "Dark mode token rebase", a: "ZE", sp: 2 },
    ],
  },
];

const capacity = [
  { name: "Ali", initials: "AL", load: 80, sp: 12 },
  { name: "Zeynep", initials: "ZE", load: 55, sp: 8 },
  { name: "Mert", initials: "ME", load: 92, sp: 14, over: true },
  { name: "Fatih", initials: "FE", load: 68, sp: 10 },
];

function StatusDot({ status }: { status: "doing" | "review" | "done" }) {
  if (status === "done") {
    return (
      <span
        aria-hidden
        className="w-3 h-3 rounded-full bg-ochre-deep grid place-items-center text-paper text-[7px] shrink-0"
      >
        <Check className="w-2 h-2" />
      </span>
    );
  }
  if (status === "review") {
    return (
      <span
        aria-hidden
        className="w-3 h-3 rounded-full border-2 border-clay shrink-0"
      />
    );
  }
  return (
    <span
      aria-hidden
      className="w-3 h-3 rounded-full border-2 border-ochre grid place-items-center shrink-0"
    >
      <span className="w-1 h-1 rounded-full bg-ochre" />
    </span>
  );
}

export function SprintMock() {
  // burndown points (ideal vs actual). 10-day sprint, day 7 active.
  const total = 50;
  const ideal = Array.from({ length: 11 }, (_, i) => total - (total * i) / 10);
  const actual: (number | null)[] = [50, 48, 44, 42, 38, 34, 33, 16, null, null, null];
  const todayIdx = 7;

  return (
    <MockChrome path="sprint #12">
      <Sidebar active="sprint" />
      <div className="flex-1 flex flex-col overflow-hidden">
        {/* sprint header bar */}
        <div className="border-b border-hairline-soft bg-paper-soft/60 px-4 py-3">
          <div className="flex items-center justify-between gap-3 mb-2">
            <div className="flex items-center gap-2 min-w-0">
              <span
                aria-hidden
                className="w-2 h-2 rounded-full bg-ochre shadow-[0_0_8px_rgba(184,134,11,0.6)] animate-[pulse-soft_3s_ease-in-out_infinite]"
              />
              <h4 className="text-[12px] md:text-[13px] font-semibold text-ink tracking-tight truncate">
                Sprint #12 — Auth & Sprint UI rework
              </h4>
              <span className="text-[10px] text-ink-mute hidden md:inline">03 Mar → 17 Mar</span>
            </div>
            <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full bg-ochre-soft text-ochre-deep text-[10px] font-bold tabular-nums shrink-0">
              <Clock className="w-2.5 h-2.5" aria-hidden />
              4 gün kaldı
            </span>
          </div>
          {/* progress bar with overlaid metrics */}
          <div className="flex items-center gap-3">
            <div className="flex-1 h-2 rounded-full bg-paper-deeper overflow-hidden relative">
              <div
                className="h-full rounded-full bg-[linear-gradient(90deg,var(--color-ochre),var(--color-clay))]"
                style={{ width: "68%" }}
              />
            </div>
            <div className="flex items-center gap-3 text-[10px] shrink-0">
              <span className="tabular-nums text-ink font-semibold">68%</span>
              <span className="text-ink-mute tabular-nums">
                17/<span className="text-ink">25</span> görev
              </span>
              <span className="text-ink-mute tabular-nums">
                34/<span className="text-ink">50</span> SP
              </span>
            </div>
          </div>
        </div>

        {/* body grid: tasks (left) + side widgets (right) */}
        <div className="flex-1 grid grid-cols-1 lg:grid-cols-[1.4fr_1fr] overflow-hidden">
          {/* tasks column */}
          <div className="overflow-hidden p-3 border-r border-hairline-soft">
            <div className="space-y-3">
              {sprintGroups.map((g) => (
                <div key={g.title}>
                  <div className="flex items-center justify-between mb-1.5 px-0.5">
                    <div className="flex items-center gap-1.5">
                      <span
                        className={`text-[10px] font-semibold tracking-tight ${
                          g.status === "done"
                            ? "text-ochre-deep"
                            : g.status === "review"
                            ? "text-clay"
                            : "text-ink"
                        }`}
                      >
                        {g.title}
                      </span>
                      <span className="text-[9px] text-ink-mute tabular-nums px-1 rounded bg-paper-deeper">
                        {g.count}
                      </span>
                    </div>
                    {g.status === "done" && g.count > g.shown && (
                      <span className="text-[9px] text-ink-mute">+{g.count - g.shown} daha</span>
                    )}
                  </div>
                  <div className="space-y-1">
                    {g.tasks.map((task) => (
                      <div
                        key={task.t}
                        className={`group flex items-center gap-2 rounded-md border border-hairline-soft bg-paper-soft px-2.5 py-1.5 ${
                          g.status === "done" ? "opacity-65" : ""
                        }`}
                      >
                        <StatusDot status={g.status} />
                        <p
                          className={`flex-1 min-w-0 text-[10px] leading-snug truncate ${
                            g.status === "done" ? "text-ink-soft line-through" : "text-ink"
                          }`}
                        >
                          {task.t}
                        </p>
                        {task.p && (
                          <span
                            className={`text-[8px] font-bold tabular-nums shrink-0 ${
                              task.p === "P0" || task.p === "P1" ? "text-clay" : "text-ochre-deep"
                            }`}
                          >
                            {task.p}
                          </span>
                        )}
                        <span className="text-[9px] text-ink-mute tabular-nums shrink-0">
                          {task.sp} SP
                        </span>
                        <div className="w-4 h-4 rounded-full bg-ochre-soft ring-1 ring-ochre/40 grid place-items-center text-[8px] font-bold text-ochre-deep shrink-0">
                          {task.a}
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* side widgets column */}
          <div className="flex flex-col gap-2.5 p-3 overflow-hidden">
            {/* burndown */}
            <div className="rounded-md border border-hairline-soft bg-paper-soft p-2.5">
              <div className="flex items-center justify-between mb-1.5">
                <p className="text-[10px] font-semibold text-ink tracking-tight">Burndown</p>
                <div className="flex items-center gap-2 text-[8px] text-ink-soft">
                  <span className="inline-flex items-center gap-1">
                    <span className="w-2 h-px bg-ink-mute" /> ideal
                  </span>
                  <span className="inline-flex items-center gap-1">
                    <span className="w-2 h-px bg-ochre" /> gerçek
                  </span>
                </div>
              </div>
              <svg viewBox="0 0 200 70" className="w-full h-16" preserveAspectRatio="none">
                {/* gridlines */}
                {[0, 17.5, 35, 52.5, 70].map((y) => (
                  <line
                    key={y}
                    x1="0"
                    y1={y}
                    x2="200"
                    y2={y}
                    stroke="var(--color-hairline-soft)"
                    strokeWidth="0.4"
                  />
                ))}
                {/* today marker */}
                <line
                  x1={(todayIdx * 200) / 10}
                  y1="0"
                  x2={(todayIdx * 200) / 10}
                  y2="70"
                  stroke="var(--color-clay)"
                  strokeWidth="0.6"
                  strokeDasharray="1.5,1.5"
                  opacity="0.5"
                />
                {/* ideal */}
                <polyline
                  fill="none"
                  stroke="var(--color-ink-mute)"
                  strokeWidth="0.8"
                  strokeDasharray="2,2"
                  points={ideal
                    .map((v, i) => `${(i * 200) / 10},${70 - (v / 50) * 60}`)
                    .join(" ")}
                />
                {/* actual area fill */}
                <polygon
                  fill="url(#sprintFill)"
                  opacity="0.3"
                  points={
                    actual
                      .map((v, i) => (v === null ? null : `${(i * 200) / 10},${70 - (v / 50) * 60}`))
                      .filter(Boolean)
                      .join(" ") + ` ${(todayIdx * 200) / 10},70 0,70`
                  }
                />
                <defs>
                  <linearGradient id="sprintFill" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="0%" stopColor="var(--color-ochre)" stopOpacity="0.6" />
                    <stop offset="100%" stopColor="var(--color-ochre)" stopOpacity="0" />
                  </linearGradient>
                </defs>
                {/* actual line */}
                <polyline
                  fill="none"
                  stroke="var(--color-ochre)"
                  strokeWidth="1.6"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  points={actual
                    .map((v, i) => (v === null ? null : `${(i * 200) / 10},${70 - (v / 50) * 60}`))
                    .filter(Boolean)
                    .join(" ")}
                />
                {/* dots */}
                {actual.map((v, i) =>
                  v === null ? null : (
                    <circle
                      key={i}
                      cx={(i * 200) / 10}
                      cy={70 - (v / 50) * 60}
                      r={i === todayIdx ? "2" : "1.2"}
                      fill={i === todayIdx ? "var(--color-clay)" : "var(--color-ochre)"}
                    />
                  )
                )}
              </svg>
              <div className="flex justify-between text-[9px] text-ink-mute mt-1 tabular-nums">
                <span>
                  Bugün: <span className="text-clay font-semibold">16 SP</span> kaldı
                </span>
                <span>
                  İdeal: <span className="text-ink-soft">14 SP</span>
                </span>
              </div>
            </div>

            {/* team capacity */}
            <div className="rounded-md border border-hairline-soft bg-paper-soft p-2.5">
              <div className="flex items-center justify-between mb-1.5">
                <p className="text-[10px] font-semibold text-ink tracking-tight">Takım kapasitesi</p>
                <span className="text-[9px] text-ink-mute tabular-nums">44 SP / 50</span>
              </div>
              <div className="space-y-1">
                {capacity.map((m) => (
                  <div key={m.initials} className="flex items-center gap-2">
                    <div className="w-4 h-4 rounded-full bg-ochre-soft ring-1 ring-ochre/40 grid place-items-center text-[8px] font-bold text-ochre-deep shrink-0">
                      {m.initials}
                    </div>
                    <span className="text-[9px] text-ink min-w-0 w-10 truncate">{m.name}</span>
                    <div className="flex-1 h-1 rounded-full bg-paper-deeper overflow-hidden">
                      <div
                        className={`h-full rounded-full ${
                          m.over
                            ? "bg-[linear-gradient(90deg,var(--color-ochre),var(--color-clay))]"
                            : "bg-ochre"
                        }`}
                        style={{ width: `${m.load}%` }}
                      />
                    </div>
                    <span
                      className={`text-[9px] tabular-nums shrink-0 ${
                        m.over ? "text-clay font-semibold" : "text-ink-mute"
                      }`}
                    >
                      {m.load}%
                    </span>
                  </div>
                ))}
              </div>
            </div>

            {/* blocker */}
            <div className="rounded-md bg-clay-soft/50 border border-clay/30 p-2.5">
              <div className="flex items-center gap-1.5 mb-1">
                <span
                  aria-hidden
                  className="w-1.5 h-1.5 rounded-full bg-clay animate-[pulse-soft_2s_ease-in-out_infinite]"
                />
                <p className="text-[9px] uppercase tracking-[0.1em] text-clay font-bold">
                  Blocker
                </p>
              </div>
              <p className="text-[10px] text-ink font-medium leading-snug">
                SMTP credential rotation
              </p>
              <p className="text-[9px] text-clay/80 mt-0.5">Devops bekliyor · 2 gündür</p>
            </div>
          </div>
        </div>
      </div>
    </MockChrome>
  );
}

/* ---------- task detail ---------- */

const activity = [
  { who: "Ali", what: "durumu Review'a aldı", when: "1 sa önce" },
  { who: "Fatih", what: "PR linki ekledi", when: "2 sa önce" },
  { who: "Zeynep", what: "Görev oluşturdu", when: "Bugün 09:14" },
];

export function TaskDetailMock() {
  return (
    <MockChrome path="görev / TR-184">
      <Sidebar active="kanban" />
      <div className="flex-1 grid grid-cols-1 lg:grid-cols-[1fr_180px] overflow-hidden">
        {/* main */}
        <div className="p-4 overflow-hidden min-w-0">
          <div className="flex items-center gap-2 text-[10px] text-ink-mute mb-1.5">
            <span>Sprint #12</span>
            <ChevronRight className="w-3 h-3" aria-hidden />
            <span>Yapılıyor</span>
          </div>
          <div className="flex items-start gap-2 mb-3">
            <CircleDot className="w-4 h-4 text-ochre shrink-0 mt-0.5" aria-hidden />
            <h4 className="text-sm md:text-base font-semibold text-ink tracking-tight leading-tight">
              Auth flow düzeltmesi: refresh token süresi
            </h4>
          </div>
          <p className="text-[11px] text-ink-soft leading-relaxed mb-4">
            Refresh token 7 gün sonra invalidate olmuyor. JWT exp claim ve revoke list senkron
            değil. <span className="bg-ochre-soft text-ochre-deep px-1 rounded">@ali</span> ile
            beraber yan etkileri tartışıldı.
          </p>

          <div className="rounded-md bg-paper-soft border border-hairline-soft p-2.5 mb-3">
            <p className="text-[10px] font-semibold text-ink mb-1.5 tracking-tight">Alt görevler</p>
            <ul className="space-y-1 text-[10px]">
              <li className="flex items-center gap-1.5">
                <Check className="w-2.5 h-2.5 text-ochre-deep" aria-hidden />
                <span className="text-ink line-through opacity-60">JWT exp doğrulaması</span>
              </li>
              <li className="flex items-center gap-1.5">
                <Check className="w-2.5 h-2.5 text-ochre-deep" aria-hidden />
                <span className="text-ink line-through opacity-60">Revoke list redis migration</span>
              </li>
              <li className="flex items-center gap-1.5">
                <Circle className="w-2.5 h-2.5 text-ink-mute" aria-hidden />
                <span className="text-ink">Integration testleri</span>
              </li>
            </ul>
          </div>

          <div>
            <p className="text-[10px] font-semibold text-ink mb-1.5 tracking-tight">Aktivite</p>
            <div className="space-y-1.5">
              {activity.map((a, i) => (
                <div key={i} className="flex items-start gap-1.5 text-[10px]">
                  <div className="w-4 h-4 rounded-full bg-ochre-soft ring-1 ring-ochre/40 grid place-items-center text-[8px] font-bold text-ochre-deep shrink-0">
                    {a.who.slice(0, 2).toUpperCase()}
                  </div>
                  <p className="text-ink-soft leading-snug">
                    <span className="font-medium text-ink">{a.who}</span> {a.what}
                    <span className="text-ink-mute ml-1">· {a.when}</span>
                  </p>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* meta sidebar */}
        <aside className="hidden lg:block border-l border-hairline-soft bg-paper-soft/40 p-3 space-y-3 text-[10px]">
          <div>
            <p className="text-[9px] uppercase tracking-[0.1em] text-ink-mute font-semibold mb-1">
              Atanan
            </p>
            <div className="flex items-center gap-1.5">
              <div className="w-4 h-4 rounded-full bg-ochre-soft ring-1 ring-ochre/40 grid place-items-center text-[8px] font-bold text-ochre-deep">
                FE
              </div>
              <span className="text-ink font-medium">Fatih E.</span>
            </div>
          </div>
          <div>
            <p className="text-[9px] uppercase tracking-[0.1em] text-ink-mute font-semibold mb-1">
              Öncelik
            </p>
            <span className="inline-flex items-center gap-1 px-1.5 py-0.5 rounded bg-clay-soft text-clay text-[9px] font-bold">
              <Flag className="w-2.5 h-2.5" aria-hidden /> P1
            </span>
          </div>
          <div>
            <p className="text-[9px] uppercase tracking-[0.1em] text-ink-mute font-semibold mb-1">
              Etiket
            </p>
            <div className="flex flex-wrap gap-1">
              <span className="inline-flex items-center gap-1 px-1.5 py-0.5 rounded bg-paper-deeper text-ink-soft text-[9px]">
                <Tag className="w-2.5 h-2.5" aria-hidden /> auth
              </span>
              <span className="inline-flex items-center gap-1 px-1.5 py-0.5 rounded bg-paper-deeper text-ink-soft text-[9px]">
                bug
              </span>
            </div>
          </div>
          <div>
            <p className="text-[9px] uppercase tracking-[0.1em] text-ink-mute font-semibold mb-1">
              Deadline
            </p>
            <span className="inline-flex items-center gap-1 text-ink">
              <Clock className="w-3 h-3 text-ochre" aria-hidden />
              16 Mart
            </span>
          </div>
          <div className="pt-3 border-t border-hairline-soft">
            <p className="text-[9px] uppercase tracking-[0.1em] text-ink-mute font-semibold mb-1">
              Bağlantı
            </p>
            <a className="inline-flex items-center gap-1 text-ochre-deep">
              <Paperclip className="w-2.5 h-2.5" aria-hidden />
              github.com/.../pull/482
            </a>
            <div className="flex items-center gap-1 text-ink-mute mt-1.5">
              <MessageSquare className="w-2.5 h-2.5" aria-hidden />
              3 yorum
              <MoreHorizontal className="w-2.5 h-2.5 ml-auto" aria-hidden />
            </div>
          </div>
        </aside>
      </div>
    </MockChrome>
  );
}
