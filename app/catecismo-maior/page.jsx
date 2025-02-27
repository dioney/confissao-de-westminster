'use client'

import { useState, useEffect } from 'react'
import Navbar from '../../components/Navbar'
import { catecismoMaior } from '../../data/catecismoMaior'
import { ChevronDownIcon, ChevronUpIcon, MagnifyingGlassIcon, XMarkIcon } from '@heroicons/react/24/outline'

export default function CatecismoMaior() {
  const [searchTerm, setSearchTerm] = useState('')
  const [expandedItems, setExpandedItems] = useState({})
  const [filteredCatecismo, setFilteredCatecismo] = useState(catecismoMaior)
  const [isSearching, setIsSearching] = useState(false)
  
  useEffect(() => {
    if (searchTerm.trim() === '') {
      setFilteredCatecismo(catecismoMaior)
      return
    }
    
    const searchTermLower = searchTerm.toLowerCase()
    const filtered = catecismoMaior.filter(item => 
      item.pergunta.toLowerCase().includes(searchTermLower) || 
      item.resposta.toLowerCase().includes(searchTermLower) ||
      (item.referencias && item.referencias.toLowerCase().includes(searchTermLower))
    )
    
    setFilteredCatecismo(filtered)
    
    if (filtered.length > 0 && searchTerm.trim() !== '') {
      const newExpandedItems = {}
      filtered.forEach(item => {
        newExpandedItems[item.id] = true
      })
      setExpandedItems(newExpandedItems)
    }
  }, [searchTerm])

  const toggleItem = (id) => {
    setExpandedItems(prev => ({
      ...prev,
      [id]: !prev[id]
    }))
  }
  
  const clearSearch = () => {
    setSearchTerm('')
    setIsSearching(false)
  }

  return (
    <main className="min-h-screen">
      <Navbar />
      <div className="sm:ml-64 max-w-4xl mx-auto px-4 py-8">
        <h1 className="text-3xl font-bold mb-8 text-center">Catecismo Maior de Westminster</h1>
        
        <div className="mb-6 relative">
          <div className="relative">
            <input
              type="text"
              placeholder="Pesquisar pergunta, resposta ou referência..."
              className="w-full p-4 pl-12 border border-gray-300 dark:border-gray-700 rounded-lg bg-white dark:bg-gray-800 text-text-light dark:text-text-dark text-lg"
              value={searchTerm}
              onChange={(e) => {
                setSearchTerm(e.target.value)
                setIsSearching(e.target.value.trim() !== '')
              }}
              onFocus={() => setIsSearching(true)}
            />
            <MagnifyingGlassIcon className="absolute left-4 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
            {isSearching && (
              <button 
                onClick={clearSearch}
                className="absolute right-4 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600 dark:hover:text-gray-300"
              >
                <XMarkIcon className="h-5 w-5" />
              </button>
            )}
          </div>
          
          {isSearching && (
            <div className="mt-2 text-sm text-gray-500 dark:text-gray-400">
              {filteredCatecismo.length === 0 
                ? 'Nenhum resultado encontrado' 
                : `Encontrados ${filteredCatecismo.length} resultados`}
            </div>
          )}
        </div>
        
        <div className="space-y-4">
          {filteredCatecismo.map((item) => (
            <div key={item.id} className="border border-gray-200 dark:border-gray-700 rounded-lg overflow-hidden bg-white dark:bg-gray-900">
              <button
                onClick={() => toggleItem(item.id)}
                className="w-full text-left transition-colors p-5 relative"
              >
                <div className="absolute top-3 right-3">
                  {expandedItems[item.id] ? (
                    <ChevronUpIcon className="h-6 w-6 flex-shrink-0" />
                  ) : (
                    <ChevronDownIcon className="h-6 w-6 flex-shrink-0" />
                  )}
                </div>
                
                <div className="pr-8">
                  <div className="text-3xl font-light text-amber-500 dark:text-amber-400 mb-1">
                    {item.id}
                  </div>
                  <div className="text-xl font-normal text-gray-800 dark:text-gray-200">
                    {item.pergunta}
                  </div>
                </div>
              </button>
              
              {expandedItems[item.id] && (
                <div className="p-5 border-t border-gray-200 dark:border-gray-700">
                  <div className="mb-4">
                    <h3 className="text-lg font-semibold mb-2">Resposta:</h3>
                    <p className="text-lg pl-4">{item.resposta}</p>
                  </div>
                  
                  {item.referencias && (
                    <div>
                      <h3 className="text-lg font-semibold mb-2">Referências:</h3>
                      <p className="text-base pl-4 text-gray-600 dark:text-gray-400">{item.referencias}</p>
                    </div>
                  )}
                </div>
              )}
            </div>
          ))}
          
          {filteredCatecismo.length === 0 && (
            <div className="text-center py-8 text-gray-500 dark:text-gray-400 text-lg">
              Nenhum resultado encontrado para "{searchTerm}"
            </div>
          )}
        </div>
      </div>
    </main>
  )
} 