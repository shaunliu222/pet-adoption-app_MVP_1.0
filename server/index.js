import express from 'express'
import cors from 'cors'
import path from 'path'
import { fileURLToPath } from 'url'

const __filename = fileURLToPath(import.meta.url)
const __dirname = path.dirname(__filename)

const app = express()
const PORT = 3001

// Middleware
app.use(cors())
app.use(express.json())

// Pet data
const pets = [
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
    images: ['https://images.unsplash.com/photo-1514888286974-6c03e2ca1dba?w=400'],
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
    images: ['https://images.unsplash.com/photo-1587300003388-59208cc962cb?w=400'],
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
    images: ['https://images.unsplash.com/photo-1573865526739-10659fec78a5?w=400'],
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

// In-memory storage for applications
let applications = []
let users = []

// API Routes

// Get all pets
app.get('/api/pets', (req, res) => {
  let result = [...pets]
  const { search, type, gender } = req.query

  if (search) {
    const searchLower = search.toLowerCase()
    result = result.filter(p =>
      p.name.toLowerCase().includes(searchLower) ||
      p.breed.toLowerCase().includes(searchLower)
    )
  }

  if (type) {
    result = result.filter(p => p.type === type)
  }

  if (gender) {
    result = result.filter(p => p.gender === gender)
  }

  res.json(result)
})

// Get single pet
app.get('/api/pets/:id', (req, res) => {
  const pet = pets.find(p => p.id === parseInt(req.params.id))
  if (pet) {
    res.json(pet)
  } else {
    res.status(404).json({ error: 'Pet not found' })
  }
})

// Submit application
app.post('/api/applications', (req, res) => {
  const application = {
    id: Date.now(),
    ...req.body,
    status: 'pending',
    createdAt: new Date().toISOString()
  }
  applications.push(application)
  res.json({ success: true, id: application.id })
})

// Get applications
app.get('/api/applications', (req, res) => {
  res.json(applications)
})

// User registration
app.post('/api/auth/register', (req, res) => {
  const { username, password, email } = req.body
  if (users.find(u => u.username === username)) {
    return res.status(400).json({ error: 'Username already exists' })
  }
  const user = {
    id: Date.now(),
    username,
    password,
    email,
    createdAt: new Date().toISOString()
  }
  users.push(user)
  res.json({ success: true, userId: user.id })
})

// User login
app.post('/api/auth/login', (req, res) => {
  const { username, password } = req.body
  const user = users.find(u => u.username === username && u.password === password)
  if (user) {
    res.json({ success: true, userId: user.id, username: user.username })
  } else {
    res.status(401).json({ error: 'Invalid credentials' })
  }
})

// Toggle favorite (placeholder)
app.post('/api/favorites', (req, res) => {
  res.json({ success: true })
})

// AI API endpoints (placeholder)
app.post('/api/ai/photo', (req, res) => {
  res.json({
    success: true,
    message: 'AI photo generation API - Connect to AI agent service',
    imageUrl: '/placeholder-ai-photo.jpg'
  })
})

app.post('/api/ai/growth', (req, res) => {
  res.json({
    success: true,
    message: 'AI growth prediction API - Connect to AI agent service',
    prediction: {
      adultWeight: '15-20kg',
      adultHeight: '50-60cm',
      lifeExpectancy: '10-12 years'
    }
  })
})

app.post('/api/ai/portrait', (req, res) => {
  res.json({
    success: true,
    message: 'AI portrait generation API - Connect to AI agent service',
    imageUrl: '/placeholder-portrait.jpg'
  })
})

// Start server
app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`)
  console.log('\nAvailable API endpoints:')
  console.log('  GET  /api/pets          - Get all pets')
  console.log('  GET  /api/pets/:id      - Get single pet')
  console.log('  POST /api/applications  - Submit adoption application')
  console.log('  GET  /api/applications  - Get all applications')
  console.log('  POST /api/auth/register - User registration')
  console.log('  POST /api/auth/login    - User login')
  console.log('  POST /api/ai/photo      - AI photo (placeholder)')
  console.log('  POST /api/ai/growth     - AI growth prediction (placeholder)')
  console.log('  POST /api/ai/portrait   - AI portrait (placeholder)')
})
