document.addEventListener("DOMContentLoaded", () => {
  const container = document.getElementById("link-container");

  Promise.all([
    fetch("links.json").then(res => res.json()),
    fetch("clicks.json").then(res => res.json()).catch(() => ({}))
  ]).then(([links, clicks]) => {
    const grouped = {};
    links.forEach(link => {
      if (!grouped[link.category]) grouped[link.category] = [];
      const fullUrl = `${link.base_url}?utm_source=${link.utm_source}&utm_medium=${link.utm_medium}&utm_campaign=${link.utm_campaign}`;
      const count = clicks[fullUrl] || 0;
      grouped[link.category].push({ ...link, fullUrl, count });
    });

    for (const category in grouped) {
      const section = document.createElement("section");
      section.innerHTML = `<h2>${category}</h2>`;
      grouped[category].forEach(link => {
        const block = document.createElement("div");
        block.className = "link-block";
        block.innerHTML = `
          <a href="${link.fullUrl}" target="_blank" onclick="trackClick('${link.fullUrl}')">${link.label}</a>
          <small>${link.notes || ""}</small>
          <small>Clicks: <span id="count-${btoa(link.fullUrl)}">${link.count}</span></small><br/>
          <button class="copy" onclick="copyLink('${link.fullUrl}')">Copy Link</button>
        `;
        section.appendChild(block);
      });
      container.appendChild(section);
    }
  });
});

function copyLink(url) {
  navigator.clipboard.writeText(url);
  alert("Copied: " + url);
}

function trackClick(url) {
  const id = `count-${btoa(url)}`;
  const el = document.getElementById(id);
  if (el) {
    let val = parseInt(el.textContent || "0", 10) + 1;
    el.textContent = val;
    localStorage.setItem(id, val);
  }
}