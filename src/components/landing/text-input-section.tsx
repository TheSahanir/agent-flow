'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';
import { Send, FileText, Upload, CheckCircle } from 'lucide-react';

export default function TextInputSection() {
  const [text, setText] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [dragActive, setDragActive] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!text.trim()) return;

    setIsLoading(true);
    
    // Here you can process the text as needed
    console.log('Text submitted:', text);
    
    // Reset after submission
    setText('');
    setIsLoading(false);
  };

  const handleDrag = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    if (e.type === "dragenter" || e.type === "dragover") {
      setDragActive(true);
    } else if (e.type === "dragleave") {
      setDragActive(false);
    }
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setDragActive(false);
    
    const files = e.dataTransfer.files;
    if (files && files[0]) {
      const file = files[0];
      const reader = new FileReader();
      reader.onload = (e) => {
        const content = e.target?.result as string;
        setText(prev => prev + '\n' + content);
      };
      reader.readAsText(file);
    }
  };

  return (
    <section className="py-20 bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="text-center mb-12"
        >
          <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">
            Configure seu conteúdo
          </h2>
          <p className="text-lg text-white/70 max-w-2xl mx-auto">
            Cole todo o texto de produtos, serviços e perguntas frequentes em um único campo
          </p>
        </motion.div>

        <motion.form
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.2 }}
          onSubmit={handleSubmit}
          className="bg-white/5 backdrop-blur-xl rounded-3xl p-8 border border-white/10 shadow-2xl"
        >
          <div className="mb-6">
            <label htmlFor="content-text" className="flex items-center text-lg font-medium text-white mb-4">
              <FileText className="w-5 h-5 mr-2 text-purple-400" />
              Texto completo de produtos, serviços e FAQ
            </label>
            
            <div
              className={`relative transition-all duration-300 ${
                dragActive ? 'scale-105' : ''
              }`}
              onDragEnter={handleDrag}
              onDragLeave={handleDrag}
              onDragOver={handleDrag}
              onDrop={handleDrop}
            >
              <textarea
                id="content-text"
                rows={12}
                className="w-full px-4 py-3 bg-white/5 border border-white/20 rounded-2xl text-white placeholder-white/50 focus:outline-none focus:ring-2 focus:ring-purple-500/50 focus:border-purple-500/50 transition-all duration-300 resize-none"
                placeholder="Cole aqui todo o texto dos seus produtos, serviços, perguntas frequentes e qualquer outra informação relevante..."
                value={text}
                onChange={(e) => setText(e.target.value)}
              />
              
              {dragActive && (
                <div className="absolute inset-0 bg-purple-500/10 border-2 border-dashed border-purple-500/50 rounded-2xl flex items-center justify-center">
                  <div className="text-center">
                    <Upload className="w-8 h-8 text-purple-400 mx-auto mb-2" />
                    <p className="text-white/80 text-sm">Solte o arquivo aqui</p>
                  </div>
                </div>
              )}
            </div>
            
            <div className="mt-4 flex items-center justify-between">
              <div className="flex items-center text-sm text-white/60">
                <CheckCircle className="w-4 h-4 mr-1 text-green-400" />
                <span>Formatos aceitos: .txt, .docx, .pdf</span>
              </div>
              <div className="text-sm text-white/60">
                {text.length} caracteres
              </div>
            </div>
          </div>
          
          <div className="flex justify-end">
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              type="submit"
              disabled={isLoading || !text.trim()}
              className="inline-flex items-center px-8 py-3 bg-gradient-to-r from-purple-600 to-blue-600 text-white font-semibold rounded-2xl hover:from-purple-700 hover:to-blue-700 disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-300 shadow-lg hover:shadow-purple-500/25"
            >
              {isLoading ? (
                <>
                  <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white mr-2"></div>
                  Processando...
                </>
              ) : (
                <>
                  <Send className="w-4 h-4 mr-2" />
                  Enviar
                </>
              )}
            </motion.button>
          </div>
        </motion.form>
      </div>
    </section>
  );
}
