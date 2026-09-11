import { PortfolioData } from '../types/portfolio';
import { ThemeConfig } from '../types/theme';
import { radiusMap } from '../theme-engine/ThemeProvider';

export function generateStandaloneHtml(portfolio: PortfolioData, theme: ThemeConfig): string {
  const { personal, about, skills, experience, projects, services, education, certifications, achievements, contact, socials, resume, sections } = portfolio;
  const isEnabled = (key: string) => sections.find((s) => s.key === key)?.enabled !== false;
  const appTitle = portfolio.seo.metaTitle || `${personal.fullName} | Portfolio`;
  const appDesc = portfolio.seo.metaDescription || personal.headline || 'Professional Portfolio';

  return `<!doctype html>
<html lang="en" class="${theme.mode === 'dark' ? 'dark' : ''}" style="scroll-behavior: smooth;">
  <head>
    <meta charset="UTF-8" />
    <link rel="icon" type="image/png" href="/logo.png" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>${appTitle}</title>
    <meta name="description" content="${appDesc.replace(/"/g, '&quot;')}" />
    <link rel="preconnect" href="https://fonts.googleapis.com">
    <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
    <link href="https://fonts.googleapis.com/css2?family=Fira+Code:wght@400;500;600&family=Inter:wght@300;400;500;600;700;800&family=Plus+Jakarta+Sans:wght@400;500;600;700;800&family=Space+Grotesk:wght@500;700&display=swap" rel="stylesheet">
    <!-- Standalone Tailwind CSS & Lucide Icons via CDN (Works directly from file://) -->
    <script src="https://cdn.tailwindcss.com"></script>
    <script src="https://unpkg.com/lucide@latest"></script>
    <style>
      :root {
        --theme-primary: ${theme.colors.primary};
        --theme-primary-hover: ${theme.colors.primaryHover};
        --theme-secondary: ${theme.colors.secondary};
        --theme-accent: ${theme.colors.accent};
        --theme-bg: ${theme.colors.background};
        --theme-surface: ${theme.colors.surface};
        --theme-card: ${theme.colors.card};
        --theme-border: ${theme.colors.border};
        --theme-text: ${theme.colors.text};
        --theme-text-muted: ${theme.colors.textMuted};
        --theme-radius: ${radiusMap[theme.borderRadius] || '12px'};
        --theme-font-heading: ${theme.typography.headingFont};
        --theme-font-body: ${theme.typography.bodyFont};
      }
      body {
        background-color: var(--theme-bg);
        color: var(--theme-text);
        font-family: var(--theme-font-body), system-ui, sans-serif;
      }
      h1, h2, h3, h4 {
        font-family: var(--theme-font-heading), system-ui, sans-serif;
      }
      .theme-btn-primary {
        background: linear-gradient(135deg, var(--theme-primary), var(--theme-secondary));
        color: #ffffff;
      }
      .theme-btn-primary:hover {
        opacity: 0.95;
      }
      .theme-card {
        background-color: var(--theme-card);
        border: 1px solid var(--theme-border);
        border-radius: var(--theme-radius);
      }
    </style>
  </head>
  <body class="antialiased min-h-screen">
    
    <!-- Direct Offline Preview Header Callout -->
    <div class="bg-indigo-950/80 border-b border-indigo-800/60 px-4 py-2 text-center text-xs text-indigo-300 font-medium">
      ⚡ <strong>Instant Browser Preview:</strong> Self-contained offline mode running directly without terminal or server setup.
    </div>

    <!-- Navigation -->
    <nav class="sticky top-0 z-40 w-full backdrop-blur-xl border-b transition-colors"
      style="background-color: rgba(7, 10, 19, 0.85); border-color: var(--theme-border);">
      <div class="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <div class="flex items-center justify-between h-16">
          <a href="#hero" class="flex items-center gap-3 text-decoration-none">
            <div class="w-10 h-10 rounded-xl flex items-center justify-center font-bold text-base shadow-lg theme-btn-primary">
              ${personal.avatarFallback || personal.fullName.slice(0, 2).toUpperCase()}
            </div>
            <div>
              <div class="font-bold text-sm tracking-tight text-white">${personal.fullName}</div>
              <div class="text-[11px] text-slate-400 font-mono line-clamp-1">${personal.headline.split('|')[0]}</div>
            </div>
          </a>

          <div class="hidden md:flex items-center gap-6 text-xs font-medium text-slate-300">
            ${sections.filter((s) => s.enabled && s.key !== 'hero').slice(0, 6).map((item) => `
              <a href="#${item.key}" class="hover:text-white transition-colors capitalize">
                ${item.label.split('&')[0].trim()}
              </a>
            `).join('')}
          </div>

          <div class="flex items-center gap-3">
            ${resume.downloadUrl ? `
              <a href="${resume.downloadUrl}" target="_blank" rel="noopener noreferrer"
                class="inline-flex items-center gap-1.5 px-3 py-1.5 text-xs font-medium rounded-lg text-white shadow-sm hover:scale-105 transition-all"
                style="background-color: var(--theme-primary);">
                <i data-lucide="file-text" class="w-3.5 h-3.5"></i>
                <span>Resume</span>
              </a>
            ` : ''}
            <a href="#contact" class="inline-flex items-center gap-1 px-3 py-1.5 text-xs font-medium rounded-lg border text-slate-200 hover:text-white transition-colors"
              style="border-color: var(--theme-border);">
              <span>Connect</span>
              <i data-lucide="arrow-up-right" class="w-3.5 h-3.5"></i>
            </a>
          </div>
        </div>
      </div>
    </nav>

    <!-- Hero Section -->
    ${isEnabled('hero') ? `
    <section id="hero" class="relative pt-24 pb-20 overflow-hidden">
      <div class="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <div class="max-w-3xl space-y-6">
          <div class="inline-flex items-center gap-2 px-3 py-1.5 rounded-full border text-xs font-medium"
            style="background-color: var(--theme-surface); border-color: var(--theme-border);">
            <span class="w-2 h-2 rounded-full ${personal.availabilityStatus === 'available' ? 'bg-emerald-400 animate-ping' : 'bg-slate-500'}"></span>
            <span class="text-slate-200">${personal.availabilityText || personal.location}</span>
          </div>

          <h1 class="text-4xl sm:text-6xl font-extrabold tracking-tight text-white leading-tight">
            ${personal.fullName}
          </h1>
          <p class="text-xl sm:text-2xl font-semibold" style="color: var(--theme-primary);">
            ${personal.headline}
          </p>
          <p class="text-base text-slate-400 leading-relaxed max-w-2xl">
            ${about.summary}
          </p>

          <div class="flex flex-wrap items-center gap-4 pt-4">
            <a href="#projects" class="inline-flex items-center gap-2 px-5 py-3 rounded-xl font-semibold text-sm shadow-lg theme-btn-primary">
              <span>Explore Projects</span>
              <i data-lucide="arrow-right" class="w-4 h-4"></i>
            </a>
            <a href="#contact" class="inline-flex items-center gap-2 px-5 py-3 rounded-xl font-semibold text-sm border hover:bg-white/5 transition-all text-white"
              style="border-color: var(--theme-border);">
              <i data-lucide="mail" class="w-4 h-4"></i>
              <span>Get In Touch</span>
            </a>
          </div>

          ${about.metrics && about.metrics.length > 0 ? `
            <div class="grid grid-cols-2 sm:grid-cols-4 gap-4 pt-10 border-t" style="border-color: var(--theme-border);">
              ${about.metrics.map((m) => `
                <div class="space-y-1">
                  <div class="text-2xl sm:text-3xl font-black text-white">${m.value}</div>
                  <div class="text-xs text-slate-400 uppercase tracking-wider font-mono">${m.label}</div>
                </div>
              `).join('')}
            </div>
          ` : ''}
        </div>
      </div>
    </section>
    ` : ''}

    <!-- About Section -->
    ${isEnabled('about') ? `
    <section id="about" class="py-20 border-t" style="border-color: var(--theme-border);">
      <div class="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 space-y-10">
        <div class="space-y-2">
          <div class="text-xs font-mono font-semibold uppercase tracking-wider" style="color: var(--theme-primary);">01 / Overview</div>
          <h2 class="text-3xl font-extrabold text-white tracking-tight">About & Background</h2>
        </div>
        <div class="grid grid-cols-1 lg:grid-cols-12 gap-8">
          <div class="lg:col-span-7 space-y-4 text-slate-300 leading-relaxed text-sm">
            <p>${about.summary}</p>
          </div>
          <div class="lg:col-span-5 space-y-3">
            ${(about.highlights || []).map((h) => `
              <div class="p-4 theme-card flex items-start gap-3">
                <i data-lucide="check-circle-2" class="w-4 h-4 text-emerald-400 shrink-0 mt-0.5"></i>
                <span class="text-xs text-slate-300 leading-normal">${h}</span>
              </div>
            `).join('')}
          </div>
        </div>
      </div>
    </section>
    ` : ''}

    <!-- Skills Section -->
    ${isEnabled('skills') ? `
    <section id="skills" class="py-20 border-t" style="border-color: var(--theme-border);">
      <div class="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 space-y-10">
        <div class="space-y-2">
          <div class="text-xs font-mono font-semibold uppercase tracking-wider" style="color: var(--theme-primary);">02 / Expertise</div>
          <h2 class="text-3xl font-extrabold text-white tracking-tight">Technical Capabilities</h2>
        </div>
        <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          ${skills.map((cat) => `
            <div class="p-6 theme-card space-y-4">
              <h3 class="font-bold text-white text-base">${cat.name}</h3>
              <div class="flex flex-wrap gap-2">
                ${cat.skills.map((s) => `
                  <span class="px-2.5 py-1 rounded-lg text-xs font-medium text-slate-200 border"
                    style="background-color: var(--theme-surface); border-color: var(--theme-border);">
                    ${s.name}
                  </span>
                `).join('')}
              </div>
            </div>
          `).join('')}
        </div>
      </div>
    </section>
    ` : ''}

    <!-- Projects Section -->
    ${isEnabled('projects') ? `
    <section id="projects" class="py-20 border-t" style="border-color: var(--theme-border);">
      <div class="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 space-y-10">
        <div class="space-y-2">
          <div class="text-xs font-mono font-semibold uppercase tracking-wider" style="color: var(--theme-primary);">03 / Portfolio</div>
          <h2 class="text-3xl font-extrabold text-white tracking-tight">Featured Engineering Projects</h2>
        </div>
        <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          ${projects.map((p) => `
            <div class="p-6 theme-card flex flex-col justify-between space-y-5 hover:border-indigo-500/50 transition-all">
              <div class="space-y-3">
                <div class="flex items-center justify-between">
                  <span class="text-xs font-mono font-bold px-2 py-0.5 rounded-full ${p.featured ? 'bg-indigo-900/50 text-indigo-300' : 'text-slate-400'}">
                    ${p.featured ? '★ Featured' : 'Production'}
                  </span>
                  <div class="flex items-center gap-2">
                    ${p.githubUrl ? `<a href="${p.githubUrl}" target="_blank" class="text-slate-400 hover:text-white"><i data-lucide="terminal" class="w-4 h-4"></i></a>` : ''}
                    ${p.liveUrl ? `<a href="${p.liveUrl}" target="_blank" class="text-slate-400 hover:text-white"><i data-lucide="external-link" class="w-4 h-4"></i></a>` : ''}
                  </div>
                </div>
                <h3 class="font-bold text-white text-lg">${p.title}</h3>
                <p class="text-xs text-slate-400 leading-relaxed">${p.shortDescription}</p>
              </div>
              <div class="flex flex-wrap gap-1.5 pt-3 border-t" style="border-color: var(--theme-border);">
                ${p.tags.map((t) => `<span class="text-[11px] font-mono px-2 py-0.5 rounded bg-slate-900/80 text-slate-300 border border-slate-800">${t}</span>`).join('')}
              </div>
            </div>
          `).join('')}
        </div>
      </div>
    </section>
    ` : ''}

    <!-- Experience Section -->
    ${isEnabled('experience') ? `
    <section id="experience" class="py-20 border-t" style="border-color: var(--theme-border);">
      <div class="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 space-y-10">
        <div class="space-y-2">
          <div class="text-xs font-mono font-semibold uppercase tracking-wider" style="color: var(--theme-primary);">04 / Career</div>
          <h2 class="text-3xl font-extrabold text-white tracking-tight">Professional Trajectory</h2>
        </div>
        <div class="space-y-4">
          ${experience.map((exp) => `
            <div class="p-6 theme-card space-y-3">
              <div class="flex flex-col sm:flex-row sm:items-center justify-between gap-1">
                <div>
                  <h3 class="font-bold text-white text-base">${exp.role}</h3>
                  <div class="text-xs font-semibold text-slate-400">${exp.company} • ${exp.location || ''}</div>
                </div>
                <div class="text-xs font-mono text-slate-400">${exp.startDate} - ${exp.current ? 'Present' : (exp.endDate || '')}</div>
              </div>
              <p class="text-xs text-slate-300 leading-relaxed">${exp.description}</p>
              <div class="flex flex-wrap gap-1.5 pt-2">
                ${exp.technologies.map((tech) => `<span class="text-[10px] font-mono px-2 py-0.5 rounded bg-slate-900 text-slate-400 border border-slate-800">${tech}</span>`).join('')}
              </div>
            </div>
          `).join('')}
        </div>
      </div>
    </section>
    ` : ''}

    <!-- Contact Section -->
    ${isEnabled('contact') ? `
    <section id="contact" class="py-20 border-t" style="border-color: var(--theme-border);">
      <div class="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 space-y-10">
        <div class="space-y-2">
          <div class="text-xs font-mono font-semibold uppercase tracking-wider" style="color: var(--theme-primary);">05 / Contact</div>
          <h2 class="text-3xl font-extrabold text-white tracking-tight">Let's Build Something Together</h2>
        </div>
        <div class="grid grid-cols-1 lg:grid-cols-12 gap-8">
          <div class="lg:col-span-5 space-y-4">
            <p class="text-sm text-slate-300 leading-relaxed">
              Open to technical leadership, architecture consulting, and high-impact engineering opportunities.
            </p>
            <div class="p-4 theme-card space-y-3">
              <div class="flex items-center gap-3 text-xs text-slate-300">
                <i data-lucide="mail" class="w-4 h-4 text-indigo-400"></i>
                <a href="mailto:${contact.email}" class="hover:underline text-white">${contact.email}</a>
              </div>
              <div class="flex items-center gap-3 text-xs text-slate-300">
                <i data-lucide="map-pin" class="w-4 h-4 text-indigo-400"></i>
                <span>${contact.location}</span>
              </div>
            </div>
          </div>
          <div class="lg:col-span-7">
            <form onsubmit="event.preventDefault(); document.getElementById('msg-done').style.display='block'; setTimeout(() => document.getElementById('msg-done').style.display='none', 4000);" class="p-6 theme-card space-y-4">
              <div id="msg-done" style="display:none;" class="p-3 bg-emerald-950/80 border border-emerald-800 text-emerald-400 text-xs rounded-lg text-center font-bold">
                Message Sent Successfully!
              </div>
              <div class="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <input required placeholder="Your Name" class="w-full px-3.5 py-2.5 rounded-lg bg-slate-900 border border-slate-800 text-white text-xs focus:outline-none" />
                <input required type="email" placeholder="Your Email" class="w-full px-3.5 py-2.5 rounded-lg bg-slate-900 border border-slate-800 text-white text-xs focus:outline-none" />
              </div>
              <textarea rows="3" required placeholder="Your message..." class="w-full px-3.5 py-2.5 rounded-lg bg-slate-900 border border-slate-800 text-white text-xs focus:outline-none"></textarea>
              <button type="submit" class="w-full py-2.5 rounded-xl font-bold text-xs theme-btn-primary shadow-lg cursor-pointer">
                Send Message
              </button>
            </form>
          </div>
        </div>
      </div>
    </section>
    ` : ''}

    <!-- Footer -->
    <footer class="border-t py-12" style="background-color: #040711; border-color: var(--theme-border);">
      <div class="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 flex items-center justify-between">
        <div class="text-xs text-slate-400">© ${new Date().getFullYear()} ${personal.fullName}. All rights reserved.</div>
        <button onclick="window.scrollTo({ top: 0, behavior: 'smooth' })" class="p-2 rounded-lg border border-slate-800 bg-slate-900 text-slate-300 hover:text-white cursor-pointer">
          <i data-lucide="arrow-up" class="w-4 h-4"></i>
        </button>
      </div>
    </footer>

    <script>
      // Initialize icons
      if (window.lucide) {
        window.lucide.createIcons();
      }
    </script>
  </body>
</html>
`;
}
