export const removeHtmlStringTag = (html) => {
    return html
      .replace(/<[^>]+>/g, '')
      .replace(/<\/?p[^>]*> <\/p>/g, '')
      .replace(/<img[^>]*>/g, '')
      .replace(/<\/?span[^>]*>/g, '');
  };
  
  export const limitString = (string, length = 50) => {
    return string.substring(0, length) + '...';
  };
  