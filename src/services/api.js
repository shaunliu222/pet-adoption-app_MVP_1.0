// Mock pet data
export const pets = [
  {
    id: 1,
    name: '旺财',
    type: 'dog',
    breed: '金毛寻回犬',
    gender: 'male',
    age: '4个月',
    ageYears: 0.3,
    weight: '15kg',
    distance: '2.1km',
    location: '北京市, 朝阳区',
    status: 'available',
    description: '性格非常温顺的金毛宝宝，喜欢和人互动，已经完成了第一次疫苗接种。寻找有爱心的家庭。',
    image: 'https://images.unsplash.com/photo-1552053831-71594a27632d?w=400',
    images: [
      'https://images.unsplash.com/photo-1552053831-71594a27632d?w=400',
      'https://images.unsplash.com/photo-1587300003388-59208cc962cb?w=400'
    ],
    vaccinated: true,
    neutered: false,
    healthy: true,
    shelter: {
      name: '朝阳动物救助中心',
      avatar: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=100',
      verified: true,
      publishedAt: '2小时前'
    },
    tags: ['已疫苗', '身体健康', '习惯良好']
  },
  {
    id: 2,
    name: '咪咪',
    type: 'cat',
    breed: '三花猫',
    gender: 'female',
    age: '2岁',
    ageYears: 2,
    weight: '4kg',
    distance: '5.0km',
    location: '北京市, 海淀区',
    status: 'available',
    description: '安静的三花猫，适合喜欢安静陪伴的主人。已绝育。',
    image: 'https://images.unsplash.com/photo-1514888286974-6c03e2ca1dba?w=400',
    images: [
      'https://images.unsplash.com/photo-1514888286974-6c03e2ca1dba?w=400'
    ],
    vaccinated: true,
    neutered: true,
    healthy: true,
    shelter: {
      name: '海淀流浪猫救助站',
      avatar: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=100',
      verified: true,
      publishedAt: '1天前'
    },
    tags: ['已疫苗', '已绝育', '身体健康']
  },
  {
    id: 3,
    name: '布丁',
    type: 'dog',
    breed: '泰迪',
    gender: 'male',
    age: '1岁',
    ageYears: 1,
    weight: '8kg',
    distance: '3.5km',
    location: '北京市, 朝阳区',
    status: 'pending',
    description: '活泼好动的小泰迪，非常聪明，会简单的指令。希望能找到一个能经常带它出去玩的家庭。',
    image: 'https://images.unsplash.com/photo-1587300003388-59208cc962cb?w=400',
    images: [
      'https://images.unsplash.com/photo-1587300003388-59208cc962cb?w=400'
    ],
    vaccinated: true,
    neutered: false,
    healthy: true,
    shelter: {
      name: '朝阳动物救助中心',
      avatar: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=100',
      verified: true,
      publishedAt: '3小时前'
    },
    tags: ['已疫苗', '身体健康', '习惯良好']
  },
  {
    id: 4,
    name: '雪球',
    type: 'cat',
    breed: '波斯猫',
    gender: 'female',
    age: '3岁',
    ageYears: 3,
    weight: '5kg',
    distance: '8.2km',
    location: '北京市, 西城区',
    status: 'available',
    description: '像棉花糖一样柔软的波斯猫，性格慵懒高贵。需要定期梳理毛发。',
    image: 'https://images.unsplash.com/photo-1573865526739-10659fec78a5?w=400',
    images: [
      'https://images.unsplash.com/photo-1573865526739-10659fec78a5?w=400'
    ],
    vaccinated: true,
    neutered: true,
    healthy: true,
    shelter: {
      name: '西城宠物之家',
      avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=100',
      verified: true,
      publishedAt: '5小时前'
    },
    tags: ['已疫苗', '已绝育', '身体健康']
  }
]

// API simulation functions
export const api = {
  getPets: async (filters = {}) => {
    await new Promise(resolve => setTimeout(resolve, 300))
    let result = [...pets]

    if (filters.search) {
      const search = filters.search.toLowerCase()
      result = result.filter(p =>
        p.name.toLowerCase().includes(search) ||
        p.breed.toLowerCase().includes(search)
      )
    }

    if (filters.type) {
      result = result.filter(p => p.type === filters.type)
    }

    if (filters.gender) {
      result = result.filter(p => p.gender === filters.gender)
    }

    return result
  },

  getPet: async (id) => {
    await new Promise(resolve => setTimeout(resolve, 200))
    return pets.find(p => p.id === parseInt(id))
  },

  submitApplication: async (data) => {
    await new Promise(resolve => setTimeout(resolve, 500))
    return { success: true, id: Date.now() }
  },

  // AI APIs (placeholder)
  generateAiPhoto: async (petId, userPhoto) => {
    await new Promise(resolve => setTimeout(resolve, 1000))
    return { success: true, imageUrl: '/placeholder-ai-photo.jpg' }
  },

  predictGrowth: async (petId) => {
    await new Promise(resolve => setTimeout(resolve, 1000))
    return { success: true, prediction: 'Adult size: Medium (15-20kg)' }
  },

  generatePortrait: async (petId, style) => {
    await new Promise(resolve => setTimeout(resolve, 1000))
    return { success: true, imageUrl: '/placeholder-portrait.jpg' }
  }
}
