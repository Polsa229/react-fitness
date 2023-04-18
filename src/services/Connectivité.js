export const Connectivite = () => {
    const user = JSON.parse(window.localStorage.getItem('user'));
    // Vérifier si les variables localStorage sont présentes
    if (user === null || user.userId === null || user.userEmail === null) {
        // Si les variables sont absentes, déconnecter l'utilisateur
        // Par exemple, vous pouvez rediriger l'utilisateur vers la page de connexion
        window.location.href = '/Admin/Connexion';
    }else{
        return user;
    }
}