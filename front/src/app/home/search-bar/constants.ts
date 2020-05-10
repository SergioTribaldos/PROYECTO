import { TemplateRef } from '@angular/core';

export const BUTTONS_LIST = [
  {
    triggerMenu: ('priceMenu' as unknown) as TemplateRef<any>,
    relatedFormFields: (form) =>
      form.get('minPrice').value || form.get('maxPrice').value,
    uniqueIcon: 'euro_symbol',
    label: 'Precio',
  },
  {
    triggerMenu: ('categoriesMenu' as unknown) as TemplateRef<any>,
    relatedFormFields: (form) => form.get('tags').value,
    uniqueIcon: 'music_note',
    label: 'Categorías',
  },
  {
    triggerMenu: ('distanceMenu' as unknown) as TemplateRef<any>,
    relatedFormFields: (form) => form.get('maxDistance').value,
    uniqueIcon: 'location_on',
    label: 'Distancia',
  },
];
