/**
 * EduVoice CMS Widget Loader
 * Carga y renderiza widgets de testimonios de forma sencilla
 */

(function () {
  'use strict';

  // Obtener el div del widget
  const widgetDiv = document.getElementById('eduvoice-widget');
  if (!widgetDiv) return;

  // Obtener atributos del widget
  const orgId = widgetDiv.getAttribute('data-orgid');
  const category = widgetDiv.getAttribute('data-category');
  const layout = widgetDiv.getAttribute('data-layout') || 'grid';
  const theme = widgetDiv.getAttribute('data-theme') || 'light';
  const featuredOnly = widgetDiv.getAttribute('data-featured-only') === 'true';
  const limit = parseInt(widgetDiv.getAttribute('data-limit') || '10');

  // Parámetros adicionales de configuración
  const columns = widgetDiv.getAttribute('data-columns') || '3';
  const cardStyle = widgetDiv.getAttribute('data-cardstyle') || 'elevated';
  const borderRadius = widgetDiv.getAttribute('data-borderradius') || 'lg';
  const showTitle = widgetDiv.getAttribute('data-showtitle') !== 'false';
  const showAvatar = widgetDiv.getAttribute('data-showavatar') !== 'false';
  const showDate = widgetDiv.getAttribute('data-showdate') !== 'false';
  const showCategory = widgetDiv.getAttribute('data-showcategory') !== 'false';
  const showRating = widgetDiv.getAttribute('data-showrating') !== 'false';
  const showMedia = widgetDiv.getAttribute('data-showmedia') !== 'false';
  const showHighlight = widgetDiv.getAttribute('data-showhighlight') !== 'false';
  const primaryColor = widgetDiv.getAttribute('data-primarycolor');
  const secondaryColor = widgetDiv.getAttribute('data-secondarycolor');
  const backgroundColor = widgetDiv.getAttribute('data-backgroundcolor');
  const cardBackgroundColor = widgetDiv.getAttribute('data-cardbackgroundcolor');
  const textColor = widgetDiv.getAttribute('data-textcolor');
  const starColor = widgetDiv.getAttribute('data-starcolor');
  const titleText = widgetDiv.getAttribute('data-titletext');
  const subtitleText = widgetDiv.getAttribute('data-subtitletext');
  const titleSize = widgetDiv.getAttribute('data-titlesize') || '4xl';
  const textSize = widgetDiv.getAttribute('data-textsize') || 'sm';
  const avatarSize = widgetDiv.getAttribute('data-avatarsize') || 'md';
  const hoverEffect = widgetDiv.getAttribute('data-hovereffect') !== 'false';
  const animateOnScroll = widgetDiv.getAttribute('data-animateonscroll') === 'true';
  const fontFamily = widgetDiv.getAttribute('data-fontfamily');
  const orderBy = widgetDiv.getAttribute('data-orderby') || 'fecha';
  const orderDirection = widgetDiv.getAttribute('data-orderdirection') || 'desc';

  if (!orgId) {
    console.error('EduVoice Widget: data-orgid es requerido');
    return;
  }

  // Obtener el dominio automáticamente desde el script
  let widgetDomain = '';

  // Intentar obtener desde document.currentScript
  if (document.currentScript) {
    const src = document.currentScript.src;
    const url = new URL(src);
    widgetDomain = url.origin;
  } else {
    // Fallback: buscar el script en el DOM
    const scripts = document.getElementsByTagName('script');
    for (let i = scripts.length - 1; i >= 0; i--) {
      const script = scripts[i];
      if (script.src && script.src.includes('widget.js')) {
        const url = new URL(script.src);
        widgetDomain = url.origin;
        break;
      }
    }
  }

  if (!widgetDomain) {
    console.error('EduVoice Widget: No se pudo determinar el dominio del widget');
    return;
  }

  // Construir parámetros de la URL
  const params = new URLSearchParams({
    organizacionId: orgId,
    layout,
    theme,
    limit: limit.toString(),
    columns,
    cardStyle,
    borderRadius,
    showTitle: showTitle.toString(),
    showAvatar: showAvatar.toString(),
    showDate: showDate.toString(),
    showCategory: showCategory.toString(),
    showRating: showRating.toString(),
    showMedia: showMedia.toString(),
    showHighlight: showHighlight.toString(),
    titleSize,
    textSize,
    avatarSize,
    hoverEffect: hoverEffect.toString(),
    animateOnScroll: animateOnScroll.toString(),
    orderBy,
    orderDirection,
  });

  if (category) {
    params.append('categoriaId', category);
  }

  if (featuredOnly) {
    params.append('destacados', 'true');
  }

  // Agregar colores solo si están especificados
  if (primaryColor) params.append('primaryColor', primaryColor);
  if (secondaryColor) params.append('secondaryColor', secondaryColor);
  if (backgroundColor) params.append('backgroundColor', backgroundColor);
  if (cardBackgroundColor) params.append('cardBackgroundColor', cardBackgroundColor);
  if (textColor) params.append('textColor', textColor);
  if (starColor) params.append('starColor', starColor);
  if (titleText) params.append('titleText', titleText);
  if (subtitleText) params.append('subtitleText', subtitleText);
  if (fontFamily) params.append('fontFamily', fontFamily);

  // Crear iframe
  const iframe = document.createElement('iframe');
  iframe.src = `${widgetDomain}/widget/embed?${params.toString()}`;
  iframe.style.width = '100%';
  iframe.style.border = 'none';
  iframe.style.minHeight = '600px';
  iframe.style.display = 'block';
  iframe.setAttribute('scrolling', 'no');
  iframe.setAttribute('frameborder', '0');
  iframe.setAttribute('allow', 'accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture');

  // Manejar mensajes de altura desde el iframe
  const handleMessage = function (e) {
    if (e.data && e.data.type === 'voiceshub-height') {
      const height = Math.max(e.data.height, 600);
      iframe.style.height = height + 'px';
      iframe.style.minHeight = height + 'px';
    }
  };

  window.addEventListener('message', handleMessage);

  // Limpiar listeners al remover el iframe
  const observer = new MutationObserver(function (mutations) {
    mutations.forEach(function (mutation) {
      if (mutation.removedNodes.length) {
        mutation.removedNodes.forEach(function (node) {
          if (node === iframe) {
            window.removeEventListener('message', handleMessage);
            observer.disconnect();
          }
        });
      }
    });
  });

  observer.observe(widgetDiv.parentNode, { childList: true, subtree: true });

  // Insertar iframe
  widgetDiv.appendChild(iframe);
})();
