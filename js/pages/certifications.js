/* Certifications archive cards and category filters */
(function () {
  "use strict";

  var certificateFiles = [
    {
      file: "1. ELECTRO MECH ISO 9001 IAS CLR.pdf",
      title: "ISO 9001:2015",
      category: "ISO & MANAGEMENT SYSTEMS",
      description: "Quality management system certification, subject to annual surveillance."
    },
    {
      file: "2. ISO 14001_2015.pdf",
      title: "ISO 14001:2015",
      category: "ISO & MANAGEMENT SYSTEMS",
      description: "Environmental management system registration certificate."
    },
    {
      file: "BSTI certificate for Using Standard Mark.pdf",
      title: "BSTI Standard Mark License — Power Transformers",
      category: "PRODUCT & PARTNER APPROVALS",
      description: "BSTI license to use the Standard Mark for power transformers under BDS IEC 60076 (Part 1):2016."
    },
    {
      file: "INVT Partner Certificate-Electro Mech Power Ltd.pdf",
      title: "INVT Authorized Silver Distributor",
      category: "PRODUCT & PARTNER APPROVALS",
      description: "Electro Mech Power Ltd is authorized for INVT low-voltage inverters, servo products and control products in Bangladesh through 2026."
    },
    {
      file: "ELECTROMECH POWER LTD.pdf",
      title: "HD Hyundai Electric Authorized Distributor",
      category: "PRODUCT & PARTNER APPROVALS",
      description: "Authorized distributor for HD Hyundai Electric low- and medium-voltage circuit breakers and contactors in Bangladesh through 2026."
    },
    {
      file: "Bangladesh Electrical Association 2026.pdf",
      title: "Bangladesh Electrical Association — 2026",
      category: "PRODUCT & PARTNER APPROVALS",
      description: "Bangladesh Electrical Association document for 2026."
    },
    {
      file: "BIDA Approved Machine List.pdf",
      title: "BIDA Registration Amendment — Director Details",
      category: "BUSINESS REGISTRATION & TRADE",
      description: "BIDA registration amendment document listing company directors."
    },
    {
      file: "BIDA Approved Registration.pdf",
      title: "BIDA Project Registration — Production Capacity",
      category: "BUSINESS REGISTRATION & TRADE",
      description: "BIDA project registration amendment with approved annual production capacity details."
    },
    {
      file: "Bepza License Upto- 30th June-2026.pdf",
      title: "BEPZA License",
      category: "BUSINESS REGISTRATION & TRADE",
      description: "BEPZA license document; the file indicates validity through 30 June 2026."
    },
    {
      file: "EMAEL Trade License 2026-27.pdf",
      title: "EMAEL Trade License — 2026–27",
      category: "BUSINESS REGISTRATION & TRADE",
      description: "Trade license document for Electro Mech Automation & Engineering Ltd for 2026–27."
    },
    {
      file: "EMPL Trade License 2026-27 CTG.pdf",
      title: "EMPL Trade License — Chattogram, 2026–27",
      category: "BUSINESS REGISTRATION & TRADE",
      description: "Chattogram trade license document for Electro Mech Power Ltd for 2026–27."
    },
    {
      file: "EMPL Trade License 2026-27.pdf",
      title: "EMPL Trade License — 2026–27",
      category: "BUSINESS REGISTRATION & TRADE",
      description: "Trade license document for Electro Mech Power Ltd for 2026–27."
    },
    {
      file: "ERC 2026-27.pdf",
      title: "Export Registration Certificate — 2026–27",
      category: "IMPORT & EXPORT",
      description: "Export Registration Certificate for Electro Mech Automation and Engineering Ltd, valid through 30 June 2027."
    },
    {
      file: "Ind. IRC 26-27.pdf",
      title: "Industrial Import Registration Certificate — 2026–27",
      category: "IMPORT & EXPORT",
      description: "Industrial Import Registration Certificate for Electro Mech Automation and Engineering Ltd, valid through 30 June 2027."
    },
    {
      file: "IRC (Commercial ) 2026-27.pdf",
      title: "Commercial Import Registration Certificate — 2026–27",
      category: "IMPORT & EXPORT",
      description: "Commercial Import Registration Certificate for Electro Mech Power Ltd, valid through 30 June 2027."
    },
    {
      file: "MES License.pdf",
      title: "MES License",
      category: "OPERATING & SAFETY LICENSES",
      description: "Military Engineer Services license document."
    },
    {
      file: "CAAB License 2026-2027.pdf",
      title: "CAAB E/M Contractor Enlistment — 2026–27",
      category: "OPERATING & SAFETY LICENSES",
      description: "Civil Aviation Authority of Bangladesh 'A' Unlimited Class (E/M) contractor enlistment for financial year 2026–27."
    },
    {
      file: "Electrical Contractor License 2027.pdf",
      title: "Electrical Contractor License — 2027",
      category: "OPERATING & SAFETY LICENSES",
      description: "Category ABC Electrical Licensing Board contractor license, valid through 29 June 2027."
    },
    {
      file: "Electrical Supervisor License 2027.pdf",
      title: "Electrical Supervisor License — 2027",
      category: "OPERATING & SAFETY LICENSES",
      description: "Category ABC Electricity Licensing Board supervisor license, valid through 13 October 2027."
    },
    {
      file: "Factory License Feb 2027.pdf",
      title: "Factory License — February 2027",
      category: "OPERATING & SAFETY LICENSES",
      description: "Factory license renewal for Electro Mech Automation & Engineering Ltd, valid through 1 February 2027."
    },
    {
      file: "Fire License 2025-2026.pdf",
      title: "Fire License — 2025–26",
      category: "OPERATING & SAFETY LICENSES",
      description: "Fire license document for the 2025–26 period."
    },
    {
      file: "License.pdf",
      title: "BERC Transformer Oil Storage & Distribution License",
      category: "OPERATING & SAFETY LICENSES",
      description: "Bangladesh Energy Regulatory Commission license for storage and distribution of transformer oil (200 KL per year), valid through 8 November 2027."
    },
    {
      file: "Environment Clearence Certificate 24-29.pdf",
      title: "Environmental Clearance Certificate — 2024–29",
      category: "ENVIRONMENT & MANUFACTURING",
      description: "Department of Environment environmental clearance for transformer and electrical substation assembly, valid through 22 March 2029."
    },
    {
      file: "ELB Certificate Sub-station 2026.pdf",
      title: "Electrical Substation Equipment Manufacturer Approval",
      category: "ENVIRONMENT & MANUFACTURING",
      description: "Chief Electric Inspector approval for manufacturing transformers, HT/LT switchgear and PFI panels; re-approved in July 2026."
    }
  ];

  function createElement(tagName, className, text) {
    var element = document.createElement(tagName);
    element.className = className;
    if (text) element.textContent = text;
    return element;
  }

  function createCertificateCard(item, index) {
    var pdfUrl = "resources/Certificates/" + encodeURIComponent(item.file);
    var card = createElement(
      "a",
      "cert-card bg-surface-container p-space-md flex flex-col justify-between relative group hover:bg-surface-container-high transition-all duration-300 shadow-lg cursor-pointer h-full"
    );
    card.href = pdfUrl;
    card.target = "_blank";
    card.rel = "noopener noreferrer";
    card.setAttribute("data-category", item.category);

    var body = createElement("div", "flex flex-col gap-space-sm flex-1");
    var header = createElement(
      "div",
      "h-12 shrink-0 flex items-start justify-between gap-space-xs overflow-hidden"
    );
    header.appendChild(
      createElement(
        "span",
        "font-label-caps text-label-caps text-primary uppercase font-bold line-clamp-2",
        String(index + 1).padStart(2, "0") + " // " + item.category
      )
    );
    header.appendChild(
      createElement(
        "span",
        "font-badge-label text-badge-label text-on-surface-variant bg-surface-container-lowest px-1.5 py-0.5",
        "PDF"
      )
    );
    body.appendChild(header);

    var textBlock = createElement(
      "div",
      "h-20 shrink-0 flex flex-col justify-start overflow-hidden"
    );
    textBlock.appendChild(
      createElement(
        "h3",
        "h-20 shrink-0 overflow-hidden font-title-md text-title-md uppercase text-on-surface font-bold group-hover:text-primary transition-colors leading-snug line-clamp-3",
        item.title
      )
    );
    body.appendChild(textBlock);

    var preview = createElement(
      "div",
      "w-full aspect-[1.4/1] relative overflow-hidden shadow-inner my-space-xs"
    );
    var frame = document.createElement("iframe");
    frame.className = "w-full h-full border-0 pointer-events-none";
    frame.src = pdfUrl + "#page=1&toolbar=0&navpanes=0&scrollbar=0";
    frame.title = item.title + " certificate preview";
    frame.loading = "lazy";
    preview.appendChild(frame);
    body.appendChild(preview);
    card.appendChild(body);

    var footer = createElement(
      "div",
      "pt-space-md flex items-center justify-between mt-auto"
    );
    var action = createElement(
      "span",
      "font-label-caps text-label-caps uppercase text-primary group-hover:translate-x-1 transition-transform flex items-center gap-space-xs"
    );
    action.appendChild(createElement("span", "", "VIEW DOCUMENT"));
    action.appendChild(
      createElement("span", "material-symbols-outlined text-sm", "arrow_forward")
    );
    footer.appendChild(action);
    footer.appendChild(
      createElement(
        "span",
        "material-symbols-outlined text-on-surface-variant group-hover:text-on-surface transition-colors text-base",
        "visibility"
      )
    );
    card.appendChild(footer);
    return card;
  }

  var grid = document.getElementById("certificatesGrid");
  if (grid) {
    var cardFragment = document.createDocumentFragment();
    certificateFiles.forEach(function (item, index) {
      cardFragment.appendChild(createCertificateCard(item, index));
    });
    grid.replaceChildren(cardFragment);
  }

  var filterButtons = document.querySelectorAll(".filter-btn");
  filterButtons.forEach(function (button) {
    button.addEventListener("click", function () {
      var filterValue = button.getAttribute("data-filter");
      filterButtons.forEach(function (filterButton) {
        filterButton.classList.remove(
          "bg-primary-container",
          "text-on-primary-container"
        );
        filterButton.classList.add(
          "bg-surface-container-high",
          "text-on-surface-variant"
        );
      });
      button.classList.add("bg-primary-container", "text-on-primary-container");
      button.classList.remove(
        "bg-surface-container-high",
        "text-on-surface-variant"
      );
      if (!grid) return;
      grid.querySelectorAll(".cert-card").forEach(function (card) {
        card.style.display =
          filterValue === "ALL" ||
          card.getAttribute("data-category") === filterValue
            ? "flex"
            : "none";
      });
    });
  });
})();
