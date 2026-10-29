let miBlob = null;
const resultado = document.getElementById('resultado');

// 1. Crear Blob de texto
document.getElementById('btnCrear').addEventListener('click', () => {
    const contenido = "Este es el contenido original del archivo creado mediante un Blob en JavaScript.\nUniversidad Católica de Salta - Lenguaje IV.";
    miBlob = new Blob([contenido], { type: 'text/plain' });
    
    resultado.textContent = `¡Blob creado con éxito!\n- Tamaño: ${miBlob.size} bytes\n- Tipo: ${miBlob.type}\n- Contenido: "${contenido}"`;
});

// 2. Descargar el Blob como archivo
document.getElementById('btnDescargar').addEventListener('click', () => {
    if (!miBlob) {
        alert('Primero debes crear el Blob.');
        return;
    }
    const url = URL.createObjectURL(miBlob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'archivo_ejemplo.txt';
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
});

// 3. Usar Slice para recortar parte del Blob
document.getElementById('btnSlice').addEventListener('click', () => {
    if (!miBlob) {
        alert('Primero debes crear el Blob.');
        return;
    }
    
    // Recortamos los primeros 45 bytes del Blob usando slice()
    const blobCortado = miBlob.slice(0, 45, 'text/plain');
    
    const reader = new FileReader();
    reader.onload = function(e) {
        resultado.textContent = `[Resultado de aplicar slice(0, 45)]\n- Tamaño recortado: ${blobCortado.size} bytes\n- Contenido parcial: "${e.target.result}"`;
    };
    reader.readAsText(blobCortado);
});