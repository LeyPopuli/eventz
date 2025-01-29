export const headerLinks = [
    {
      label: 'Inicio',
      route: '/',
    },
    {
      label: 'Crear evento',
      route: '/events/create',
    },
    {
      label: 'Perfil',
      route: '/profile',
    },
  ]
  
  export const eventDefaultValues = {
    title: '',
    description: '',
    site: '',
    imageUrl: '',
    organizer: '',
    startDateTime: new Date(),
    endDateTime: new Date(),
    url: '',
    categoryId: '',
    minAssistance: 0,
    maxAssistance: 0,
  }
