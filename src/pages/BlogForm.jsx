export const BlogForm = () => {
  return (
      <div className="container mx-auto p-4 m-10">
          <h2 className="text-4xl font-bold text-gray-800 mb-6">Publicar un Nuevo Blog</h2>
          <form className="space-y-4">
              <div>
                  <label htmlFor="blogImage" className="block text-sm font-medium text-gray-700">Imagen del Blog</label>
                  <input type="file" id="blogImage" name="blogImage" className="mt-1 block w-full"/>
              </div>
              <div>
                  <label htmlFor="blogTitle" className="block text-sm font-medium text-gray-700">Nombre del Blog</label>
                  <input type="text" id="blogTitle" name="blogTitle" className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm"/>
              </div>
              <div>
                  <label htmlFor="blogDescription" className="block text-sm font-medium text-gray-700">Descripción</label>
                  <textarea id="blogDescription" name="blogDescription" rows="4" className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm"></textarea>
              </div>
              <div>
                  <label htmlFor="blogLink" className="block text-sm font-medium text-gray-700">Link</label>
                  <input type="url" id="blogLink" name="blogLink" className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm"/>
              </div>
              <div>
                  <label htmlFor="blogCategory" className="block text-sm font-medium text-gray-700">Categoría</label>
                  <select id="blogCategory" name="blogCategory" className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm">
                      <option value="tecnologia">Tecnología</option>
                      <option value="educacion">Educación</option>
                      <option value="salud">Salud</option>
                      <option value="viajes">Viajes</option>
                      {/* Otras categorías aquí */}
                  </select>
              </div>
              <button type="submit" className="px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600">Publicar Blog</button>
          </form>
      </div>
  );
};