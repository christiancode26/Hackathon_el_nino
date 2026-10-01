import React, { useState } from 'react'
import {
  Users,
  Camera,
  MapPin,
  Heart,
  MessageCircle,
  ShieldCheck,
  Send,
  Leaf,
  Sparkles,
} from 'lucide-react'
import { useAuth } from '../context/AuthContext'
import Button from '../components/Button'

export default function Feed() {
  const { profile, addPoints } = useAuth()
  const [filter, setFilter] = useState('Para você')
  const [postText, setPostText] = useState('')
  const [toastMessage, setToastMessage] = useState(null)

  const [posts, setPosts] = useState([
    {
      id: 1,
      author: 'Marina Silva',
      initials: 'MS',
      time: 'Há 18 min',
      bairro: 'Vila Mariana',
      text: 'Plantamos uma muda de ipê na praça da Rua França Pinto! Obrigada a todo mundo que ajudou. Daqui a pouco teremos mais sombra por aqui.',
      imageUrl: 'https://images.unsplash.com/photo-1542601906990-b4d3fb778b09?auto=format&fit=crop&w=800&q=80',
      actionType: 'Ação ambiental',
      actionDesc: 'Plantio e cuidado de área verde',
      points: 20,
      likes: 24,
      isLiked: false,
      comments: 5,
      confirmed: false,
    },
    {
      id: 2,
      author: 'Rafael Costa',
      initials: 'RC',
      time: 'Há 1 h',
      bairro: 'Vila Mariana',
      text: 'O bueiro na esquina da Rua Vergueiro está com muitas folhas. Já sinalizei no mapa e avisei a subprefeitura. Alguém da região pode confirmar?',
      actionType: 'Alerta comunitário',
      actionDesc: 'Desobstrução de via pública',
      points: 10,
      likes: 12,
      isLiked: false,
      comments: 3,
      confirmed: false,
    },
  ])

  const handleCreatePost = (e) => {
    e.preventDefault()
    if (!postText.trim()) return

    const newPost = {
      id: Date.now(),
      author: profile?.nome || 'Lucas Mendes',
      initials: 'LM',
      time: 'Agora mesmo',
      bairro: profile?.bairro || 'Vila Mariana',
      text: postText.trim(),
      actionType: 'Ação comunitária',
      actionDesc: 'Mobilização pelo bairro',
      points: 10,
      likes: 1,
      isLiked: true,
      comments: 0,
      confirmed: false,
    }

    setPosts([newPost, ...posts])
    setPostText('')
    addPoints(10)
    setToastMessage('🎉 Ação compartilhada com o seu bairro! +10 pontos')
    setTimeout(() => setToastMessage(null), 3500)
  }

  const handleLike = (id) => {
    setPosts((prev) =>
      prev.map((p) => {
        if (p.id === id) {
          return {
            ...p,
            isLiked: !p.isLiked,
            likes: p.isLiked ? p.likes - 1 : p.likes + 1,
          }
        }
        return p
      })
    )
  }

  const handleConfirmAction = (id) => {
    setPosts((prev) =>
      prev.map((p) => {
        if (p.id === id && !p.confirmed) {
          addPoints(5)
          setToastMessage('🛡 Você confirmou esta ação como vizinho(a)! +5 pontos de validação comunitária.')
          setTimeout(() => setToastMessage(null), 3500)
          return { ...p, confirmed: true }
        }
        return p
      })
    )
  }

  return (
    <div className="max-w-3xl mx-auto px-4 sm:px-6 py-6 space-y-6">
      {/* Toast Feedback */}
      {toastMessage && (
        <div className="fixed top-6 right-6 z-50 bg-[#153B2D] text-white px-5 py-3 rounded-2xl shadow-xl flex items-center gap-3 border border-emerald-500/30 animate-bounce">
          <Sparkles className="w-5 h-5 text-amber-300 shrink-0" />
          <span className="text-sm font-bold">{toastMessage}</span>
        </div>
      )}

      {/* Topo do Feed */}
      <div className="flex items-center justify-between">
        <div>
          <span className="text-[10px] font-extrabold uppercase tracking-wider text-emerald-800 block">
            {profile?.bairro?.toUpperCase() || 'VILA MARIANA'}
          </span>
          <h1 className="text-2xl sm:text-3xl font-black text-gray-900 tracking-tight">
            Comunidade em ação
          </h1>
        </div>

        <button className="flex items-center gap-2 px-4 py-2 bg-white rounded-2xl border border-gray-200 text-xs font-bold text-gray-700 shadow-sm hover:bg-gray-50 transition-colors">
          <Users className="w-4 h-4 text-emerald-600" />
          <span>Meus vizinhos</span>
        </button>
      </div>

      {/* Caixa de Criação de Post */}
      <form
        onSubmit={handleCreatePost}
        className="bg-white rounded-3xl p-4 sm:p-5 border border-gray-100 shadow-sm space-y-3"
      >
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-2xl bg-emerald-100 text-emerald-800 flex items-center justify-center font-bold text-xs shrink-0">
            LM
          </div>
          <input
            type="text"
            placeholder="Compartilhe uma ação com o bairro..."
            value={postText}
            onChange={(e) => setPostText(e.target.value)}
            className="flex-1 bg-gray-50 border border-gray-200 rounded-2xl px-4 py-3 text-xs sm:text-sm text-gray-800 placeholder-gray-400 focus:bg-white focus:outline-none focus:ring-2 focus:ring-[#EC6FA3]/30 focus:border-[#EC6FA3]"
          />
        </div>

        <div className="flex items-center justify-between pt-1">
          <div className="flex items-center gap-2 text-gray-400">
            <button
              type="button"
              className="p-2 hover:bg-gray-100 rounded-xl text-emerald-600 transition-colors"
              title="Anexar foto"
            >
              <Camera className="w-5 h-5" />
            </button>
            <button
              type="button"
              className="p-2 hover:bg-gray-100 rounded-xl text-orange-500 transition-colors"
              title="Marcar localização"
            >
              <MapPin className="w-5 h-5" />
            </button>
          </div>

          <Button
            type="submit"
            size="sm"
            variant="brand"
            disabled={!postText.trim()}
            icon={<Send className="w-3.5 h-3.5" />}
          >
            Publicar
          </Button>
        </div>
      </form>

      {/* Filtros em Pílula */}
      <div className="flex items-center gap-2 overflow-x-auto pb-1">
        {['Para você', 'Mais recentes', 'Pontos de risco'].map((f) => (
          <button
            key={f}
            onClick={() => setFilter(f)}
            className={`px-4 py-2 rounded-2xl text-xs font-bold transition-all ${
              filter === f
                ? 'bg-[#EC6FA3] text-white shadow-sm'
                : 'bg-white text-gray-600 border border-gray-200 hover:bg-gray-50'
            }`}
          >
            {f}
          </button>
        ))}
      </div>

      {/* Lista de Postagens */}
      <div className="space-y-6">
        {posts.map((post) => (
          <div
            key={post.id}
            className="bg-white rounded-3xl border border-gray-100 shadow-sm overflow-hidden"
          >
            {/* Cabeçalho do Post */}
            <div className="p-5 flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-2xl bg-emerald-100 text-emerald-800 flex items-center justify-center font-bold text-xs">
                  {post.initials}
                </div>
                <div>
                  <h4 className="text-sm font-bold text-gray-900 leading-tight">
                    {post.author}
                  </h4>
                  <div className="flex items-center gap-1.5 text-[11px] text-gray-400 mt-0.5">
                    <span>{post.time}</span>
                    <span>•</span>
                    <span>{post.bairro}</span>
                  </div>
                </div>
              </div>
            </div>

            {/* Texto do Post */}
            <p className="px-5 text-xs sm:text-sm text-gray-700 leading-relaxed pb-3">
              {post.text}
            </p>

            {/* Imagem (se houver) */}
            {post.imageUrl && (
              <div className="w-full max-h-96 overflow-hidden bg-gray-100">
                <img
                  src={post.imageUrl}
                  alt="Ação comunitária"
                  className="w-full h-full object-cover"
                />
              </div>
            )}

            {/* Faixa da Missão / Ação Ambiental */}
            <div className="p-4 mx-5 my-3 bg-emerald-50/60 rounded-2xl border border-emerald-100 flex items-center justify-between gap-3">
              <div className="flex items-center gap-2.5">
                <div className="w-8 h-8 rounded-xl bg-brand-green text-white flex items-center justify-center">
                  <Leaf className="w-4 h-4 fill-white" />
                </div>
                <div>
                  <span className="text-xs font-bold text-gray-900 block leading-tight">
                    {post.actionType}
                  </span>
                  <span className="text-[10px] text-gray-500 block">
                    {post.actionDesc}
                  </span>
                </div>
              </div>
              <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full text-xs font-bold bg-[#FEF9C3] text-[#854D0E] border border-[#FEF08A]">
                ⚡ +{post.points} pts
              </span>
            </div>

            {/* Estatísticas de Engajamento */}
            <div className="px-5 py-2 flex items-center justify-between text-xs text-gray-400 font-semibold border-b border-gray-100">
              <span>{post.likes} curtidas</span>
              <span>{post.comments} comentários</span>
            </div>

            {/* Botões de Ação */}
            <div className="p-3 px-5 flex items-center justify-around gap-2">
              <button
                onClick={() => handleLike(post.id)}
                className={`flex items-center gap-1.5 py-2 px-3 rounded-xl text-xs font-bold transition-colors ${
                  post.isLiked
                    ? 'text-pink-600 bg-pink-50'
                    : 'text-gray-600 hover:bg-gray-50'
                }`}
              >
                <Heart
                  className={`w-4 h-4 ${post.isLiked ? 'fill-pink-600' : ''}`}
                />
                <span>Curtir</span>
              </button>

              <button className="flex items-center gap-1.5 py-2 px-3 rounded-xl text-xs font-bold text-gray-600 hover:bg-gray-50 transition-colors">
                <MessageCircle className="w-4 h-4" />
                <span>Comentar</span>
              </button>

              <button
                onClick={() => handleConfirmAction(post.id)}
                disabled={post.confirmed}
                className={`flex items-center gap-1.5 py-2 px-3 rounded-xl text-xs font-bold transition-colors ${
                  post.confirmed
                    ? 'text-emerald-700 bg-emerald-50 cursor-default'
                    : 'text-gray-600 hover:bg-gray-50'
                }`}
              >
                <ShieldCheck className="w-4 h-4 text-emerald-600" />
                <span>{post.confirmed ? 'Confirmado ✓' : 'Confirmar ação'}</span>
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}
