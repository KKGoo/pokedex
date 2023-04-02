interface User {
    username: string;
    password: string;
  }
  
  interface AuthToken {
    token: string;
  }
  
  export function login(user: User): AuthToken | null {
    // Realizar la validación de usuario aquí
    // Si la validación es exitosa, generar un token de autenticación
    const authToken: AuthToken = {
      token: 'myAuthToken'
    };
  
    // Guardar el token de autenticación en el almacenamiento local
    localStorage.setItem('token', JSON.stringify(authToken));
  
    return authToken;
  }
  
  export function logout(): void {
    // Eliminar el token de autenticación del almacenamiento local
    localStorage.removeItem('token');
  }
  
  export function isAuthenticated(): boolean {
    // Verificar si el token de autenticación existe en el almacenamiento local
    const authToken = localStorage.getItem('token');
  
    return !!authToken;
  }