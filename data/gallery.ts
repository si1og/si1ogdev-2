
type Report = {
  id: string
  name: string
  link: string
  image: string
  isLimitedAccess: boolean
}

type GalleryContent = {
  [year: number]: {
    reports: Report[]
  }
}

export const galleryContent: GalleryContent = {
  2025: {
    reports: [
      {
        id: 'selection-for-adapters',
        name: 'Selection for adapters',
        link: 'https://vk.com/album-5919_306660752',
        image: 'selection-for-adapters-image',
        isLimitedAccess: false
      },
      {
        id: 'love-is',
        name: 'Love is...',
        link: 'https://vk.com/album-5919_306538528',
        image: 'love-is-image',
        isLimitedAccess: false
      },
      {
        id: 'adapters-1',
        name: 'Adapters 1st and 2nd meetings',
        link: 'https://vk.com/album-224490950_306549000',
        image: '1-st-and-2-nd-meetengs-image',
        isLimitedAccess: true
      },
      {
        id: 'adapters-2',
        name: 'Adapters 3rd meeting',
        link: 'https://vk.com/album-224490950_306790530',
        image: '3-rd-meeteng-image',
        isLimitedAccess: true
      },
      {
        id: 'adapters-3',
        name: 'Adapters 4th meeting',
        link: 'https://vk.com/album-224490950_306791005',
        image: '4-th-meeteng-image',
        isLimitedAccess: true
      },
      {
        id: 'adapters-4',
        name: 'Adapters 5th meeting',
        link: 'https://vk.com/album-224490950_306858088',
        image: '5-th-meeteng-image',
        isLimitedAccess: true
      },
      {
        id: 'adapters-5',
        name: 'Adapters 6th meeting',
        link: 'https://vk.com/album-224490950_306858908',
        image: '6-th-meeteng-image',
        isLimitedAccess: true
      },
      {
        id: 'adapters-6',
        name: 'Adapters 7th meeting',
        link: 'https://vk.com/album-224490950_307183631',
        image: '7-th-meeteng-image',
        isLimitedAccess: true
      },
      {
        id: 'the-satrting-point',
        name: 'The starting point...',
        link: 'https://vk.com/album-5919_306959080',
        image: 'the-starting-point-image',
        isLimitedAccess: false
      },
      {
        id: 'adapters-7',
        name: 'Adapters 8th meeting',
        link: 'https://vk.com/album-224490950_307184389',
        image: '8-th-meeteng-image',
        isLimitedAccess: true
      },
      {
        id: 'adapters-8',
        name: 'Adapters 9th meeting',
        link: 'https://vk.com/album-224490950_307399408',
        image: '9-th-meeteng-image',
        isLimitedAccess: true
      },
      {
        id: 'adapters-9',
        name: 'Adapters 10th meeting',
        link: 'https://vk.com/album-224490950_307399473',
        image: '10-th-meeteng-image',
        isLimitedAccess: true
      },
      {
        id: 'adapters-10',
        name: 'Adapters 11th meeting',
        link: 'https://vk.com/album-224490950_307399692',
        image: '11-th-meeteng-image',
        isLimitedAccess: true
      },

    ]
  },
  2024: {
    reports: [
      {
        id: 'polygroup',
        name: 'Final of the polygroup.iccs 2024',
        link: 'https://vk.com/album-5919_305413515',
        image: 'polygroup-image',
        isLimitedAccess: false
      }
    ]
  }

}