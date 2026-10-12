/* Zaw Bank (demo) — shared behaviour. Nothing leaves the browser. */
document.addEventListener('DOMContentLoaded', function () {
  'use strict';

  /* ---- mobile hamburger menu ---- */
  var toggle = document.querySelector('.menu-toggle');
  var nav = document.querySelector('.nav-links');
  if (toggle && nav) {
    toggle.addEventListener('click', function () {
      var open = nav.classList.toggle('open');
      toggle.setAttribute('aria-expanded', open ? 'true' : 'false');
    });
    nav.querySelectorAll('a').forEach(function (a) {
      a.addEventListener('click', function () { nav.classList.remove('open'); });
    });
  }

  /* ---- highlight current page in nav ---- */
  var page = document.body.getAttribute('data-page');
  if (page && nav) {
    nav.querySelectorAll('a[data-page]').forEach(function (a) {
      if (a.getAttribute('data-page') === page) a.classList.add('active');
    });
  }

  /* ---- smooth scroll for in-page anchors ---- */
  document.querySelectorAll('a[href^="#"]').forEach(function (a) {
    a.addEventListener('click', function (e) {
      var target = document.querySelector(a.getAttribute('href'));
      if (target) {
        e.preventDefault();
        target.scrollIntoView({ behavior: 'smooth', block: 'start' });
        if (nav) nav.classList.remove('open');
      }
    });
  });

  /* ---- "updated" timestamp on rates pages (client local time, Yangon) ---- */
  document.querySelectorAll('[data-updated]').forEach(function (el) {
    try {
      var now = new Date();
      var fmt = new Intl.DateTimeFormat('my-MM', {
        timeZone: 'Asia/Yangon',
        year: 'numeric', month: 'long', day: 'numeric',
        hour: '2-digit', minute: '2-digit'
      });
      el.textContent = 'နောက်ဆုံးအပ်ဒိတ်: ' + fmt.format(now) + ' (ရန်ကုန်စံတော်ချိန်)';
    } catch (err) {
      el.textContent = 'နောက်ဆုံးအပ်ဒိတ်: ' + now.toString();
    }
  });

  /* ---- footer year ---- */
  document.querySelectorAll('.js-year').forEach(function (el) {
    el.textContent = new Date().getFullYear();
  });

  /* ---- demo toast ---- */
  var toastEl = document.getElementById('demo-toast');
  var toastTimer = null;
  function showToast(msg) {
    if (!toastEl) return;
    toastEl.textContent = msg;
    toastEl.classList.add('show');
    clearTimeout(toastTimer);
    toastTimer = setTimeout(function () { toastEl.classList.remove('show'); }, 2600);
  }
  window.showDemoToast = showToast;

  document.querySelectorAll('[data-toast]').forEach(function (el) {
    el.addEventListener('click', function (e) {
      e.preventDefault();
      showToast(el.getAttribute('data-toast'));
    });
  });

  /* ---- contact form: demo only, sends nothing ---- */
  var contactForm = document.getElementById('contact-form');
  if (contactForm) {
    contactForm.addEventListener('submit', function (e) {
      e.preventDefault();
      var notice = document.getElementById('contact-demo-notice');
      if (notice) {
        notice.style.display = 'block';
        notice.scrollIntoView({ behavior: 'smooth', block: 'center' });
      } else {
        showToast('Demo ဖောင်သာ ဖြစ်သည် — မည်သည့်နေရာသို့မှ ပေးပို့ခြင်းမရှိပါ။');
      }
      contactForm.reset();
    });
  }

  /* ---- login form: any input works, nothing leaves the browser ---- */
  var loginForm = document.getElementById('login-form');
  if (loginForm) {
    loginForm.addEventListener('submit', function (e) {
      e.preventDefault();
      window.location.href = 'dashboard.html';
    });
  }
});
