document.getElementById('registration-form').addEventListener('submit', function(event) {
  event.preventDefault();

  // Obtener los valores del formulario
  let cedula = document.getElementById('cedula').value;
  let nombre = document.getElementById('nombre').value;
  let apellido = document.getElementById('apellido').value;
  let email = document.getElementById('email').value;
  let telefono = document.getElementById('telefono').value;
  let direccion = document.getElementById('direccion').value;
  let ciudad = document.getElementById('ciudad').value;
  let pais = document.getElementById('pais').value;

  // Validar campos obligatorios
  if (cedula === '' || nombre === '' || apellido === '' || email === '' || telefono === '' || direccion === '' || ciudad === '' || pais === '') {
      alert('Por favor complete todos los campos obligatorios.');
      return;
  }

  // Validar que el campo cedula solo reciba números
  if (!/^[\d]+$/.test(cedula)) {
      alert('El campo Cédula solo debe contener números.');
      return;
  }

  // Crear objeto de usuario
  let usuario = {
      cedula: cedula,
      nombre: nombre,
      apellido: apellido,
      email: email,
      telefono: telefono,
      direccion: direccion,
      ciudad: ciudad,
      pais: pais
  };

  // Obtener lista de usuarios del almacenamiento local o crear una nueva lista vacía
  let usuarios = localStorage.getItem('usuarios');
  if (usuarios) {
      usuarios = JSON.parse(usuarios);
  } else {
      usuarios = [];
  }

  // Validar que el id de usuario no exista previamente
  if (usuarios.find(user => user.cedula === cedula)) {
      alert('El usuario con la Cédula ingresada ya ha sido registrado.');
      return;
  }

  // Agregar nuevo usuario a la lista
  usuarios.push(usuario);

  // Almacenar lista de usuarios en el almacenamiento local
  localStorage.setItem('usuarios', JSON.stringify(usuarios));

  // Limpiar formulario
  document.getElementById('registration-form').reset();

  alert('Usuario registrado exitosamente.');

});

document.getElementById('listar-btn').addEventListener('click', function() {
  // Obtener lista de usuarios del almacenamiento local
  let usuarios = localStorage.getItem('usuarios');
  if (usuarios) {
      usuarios = JSON.parse(usuarios);
  } else {
      usuarios = [];
  }

  // Obtener tabla de usuarios
  let tablaUsuarios = document.getElementById('user-table-body');

  // Limpiar tabla de usuarios
  tablaUsuarios.innerHTML = '';

  // Cargar usuarios en la tabla
  usuarios.forEach(function(usuario) {
      let row = document.createElement('tr');
      row.innerHTML = `
          <td>${usuario.cedula}</td>
          <td>${usuario.nombre}</td>
          <td>${usuario.apellido}</td>
          <td>${usuario.email}</td>
          <td>${usuario.telefono}</td>
          <td>${usuario.direccion}</td>
          <td>${usuario.ciudad}</td>
          <td>${usuario.pais}</td>
      `;
      tablaUsuarios.appendChild(row);
  });
});