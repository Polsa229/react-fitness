const currentDate = new Date();
const currentMonthNumber = currentDate.getMonth() + 1
const currentYear = currentDate.getFullYear();
const currentMonthAndYear = currentMonthNumber.toString() + '/' + currentYear.toString()
const options = { year: 'numeric', month: '2-digit', day: '2-digit' };

// Récuperer tous les utilisateurs
export const AllUsers = () => {
    const users = ([
        { id: 1, image: '../Images/Userprofil.png', nom: 'Nom 1', prenom: 'Prénom 1', email: 'email1@gmail.com', telephone: '+22960000000', date: '10/04/2023', inscripteur: 1 },
        { id: 2, image: '../Images/Userprofil.png', nom: 'Nom 1', prenom: 'Prénom 1', email: 'email1@gmail.com', telephone: '+22960000000', date: '10/04/2023', inscripteur: 1 },
        { id: 3, image: '../Images/Userprofil.png', nom: 'Nom 1', prenom: 'Prénom 1', email: 'email1@gmail.com', telephone: '+22960000000', date: '10/04/2023', inscripteur: 1 },
        { id: 4, image: '../Images/Userprofil.png', nom: 'Nom 1', prenom: 'Prénom 1', email: 'email1@gmail.com', telephone: '+22960000000', date: '10/04/2023', inscripteur: 1 },
        { id: 5, image: '../Images/Userprofil.png', nom: 'Nom 1', prenom: 'Prénom 1', email: 'email1@gmail.com', telephone: '+22960000000', date: '10/04/2023', inscripteur: 1 },
    ]);
    return users;
};

// Récuperer tous les utilisateurs
export const AllAdmin = () => {
    const admin = ([
        { id: 1, nom: 'HDN', prenom: 'Ola', email: 'hodonouola@gmail.com', telephone: '+22960000000', password: '1234' },
    ]);
    return admin;
};

// Compte des abonnements
export const AllAbonnements = () => {
    const abonnements = ([
        { id: 1, users: 1, type: 1, dateExpire: '10/04/2024', date: '10/04/2023' },
        { id: 2, users: 2, type: 2, dateExpire: '11/04/2024', date: '11/04/2023' },
        { id: 3, users: 1, type: 1, dateExpire: '12/04/2024', date: '12/04/2023' },
        { id: 4, users: 3, type: 3, dateExpire: '12/04/2024', date: '12/04/2023' },
        { id: 5, users: 3, type: 3, dateExpire: '16/04/2024', date: '12/04/2023' },
        { id: 6, users: 3, type: 3, dateExpire: '17/04/2024', date: '12/04/2023' },
    ]);
    return abonnements;
};
// Enrégistrer un abonnement
export const RegistreAbonnement = (formData) => {
    const apiEndpoint = 'https://example.com/api';
    return fetch(apiEndpoint, {
        method: 'POST',
        body: formData
    }).then(response => {
        if (!response.ok) {
            throw new Error('Erreur lors de l\'envoi du formulaire à l\'API');
        }
        return response.json();
    }).then(data => {
        return data;
    }).catch(error => {
        console.error(error);
    });
};

// Compte des notifications
export const notifications = () => {
    const abonnements = AllAbonnements();

    const notification = ([
        { id: 1, title: 'Alert 1', date: '10/04/2023' },
        { id: 2, title: 'Alert 2', date: '11/04/2023' },
        { id: 3, title: 'Alert 3', date: '12/04/2023' },
        { id: 4, title: 'Alert 4', date: '13/04/2023' },
        { id: 5, title: 'Alert 5', date: '14/04/2023' },
    ]);
    return notification;
};

// Abonnements qui tendent vers leurs fins
export const getExpireSoonAbonnements = () => {
    const abonnements = AllAbonnements();

    // Filter out the subscriptions that are expiring within the next 30 days
    const expiringAbonnements = abonnements.filter(abonnement => {
        const expirationDate = new Date(abonnement.dateExpire);
        const daysUntilExpiration = Math.ceil((expirationDate.getTime() - Date.now()) / (1000 * 60 * 60 * 24));
        return daysUntilExpiration <= 30;
    });

    // Calculate the remaining days for each expiring subscription
    const abonnementsWithRemainingDays = expiringAbonnements.map(abonnement => {
        const expirationDate = new Date(abonnement.dateExpire);
        const daysUntilExpiration = Math.ceil((expirationDate.getTime() - Date.now()) / (1000 * 60 * 60 * 24));
        return {
            ...abonnement,
            remainingDays: daysUntilExpiration
        };
    });

    return abonnementsWithRemainingDays;
};



// Récupérer le types d'abonnements
export const AllTypeAbonnements = () => {
    const type = ([
        { id: 1, nom: 'VIP', durée: 1, prix: '5000' },
        { id: 2, nom: 'PRENIUM', durée: 1, prix: '3000' },
        { id: 3, nom: 'BASIC', durée: 1, prix: '1000' },
    ])
    return type;
}

//Récupérer les abonnement non expirés 
export const getNonExpiredAbonnements = () => {
    const abonnements = AllAbonnements();
    const currentDate = new Date();
    const nonExpiredAbonnements = abonnements.filter(abonnement => {
        const expirationDate = new Date(abonnement.dateExpire) ? new Date(abonnement.dateExpire) : abonnement.dateExpire;
        return expirationDate >= currentDate;
    });
    return nonExpiredAbonnements;
};

// Récuperer les utilisateurs en fonction par id
export const typeAbonnementsById = (id) => {
    const typeAbonnements = AllTypeAbonnements();
    const result = typeAbonnements.find(typeAbonnement => typeAbonnement.id === id);
    return result;
};

// Récuperer les utilisateurs en fonction par id
export const UsersById = (id) => {
    const users = AllUsers();
    const result = users.find(user => user.id === id);
    return result;
};


// const result = AdminByEmailAndPassword(mail, motdepasse)
// const nombreDeListes = Object.keys(result).length;

// Récuperer les admins en fonction par id
export const AdminById = (id) => {
    const admins = AllAdmin();
    const result = admins.find(admin => admin.id === id);
    return result;
};


// const result = AdminByEmailAndPassword(mail, motdepasse)
// const nombreDeListes = Object.keys(result).length;

// Récuperer les admins en fonction par id
export const AdminByEmailAndPassword = (Email, Password) => {
    const admins = AllAdmin();
    const result = admins.find(admin => admin.email === Email && admin.password === Password);
    return result;
};

// Connexion des admins
export const LoginAdmin = (mail, motdepasse) => {
    let statut = false;

    const result = AdminByEmailAndPassword(mail, motdepasse)
    const nombreDeListes = Object.keys(result).length;

    if (nombreDeListes !== 0) {
        statut = true;
        // Récupérer Id de l'utilisateur
        const id = result.id;
        const utilisateur = {
            userMail: mail,
            userId: id,
        };
        window.localStorage.setItem('user', JSON.stringify(utilisateur));
        // Si l'authentification réussit, on peut rediriger l'utilisateur vers une autre page
        window.location.href = "/Admin";
    } else {
        statut = false;
    }
    return statut ? statut : false;
};

// Stocker un objet dans le localstorage
export const localStorage = (data) => {
    window.localStorage.setItem('user', JSON.stringify(data));
}

// Deconnexion des admins
export const DeconnexionUsers = () => {
    window.localStorage.removeItem('user'); // Supprime les données de l'utilisateur dans le localStorage
    window.location.href = '/Admin/Connexion'; // Redirige l'utilisateur vers la page de connexion
};



// Récupérer les abonnements à partie de la date d'expiration
export const AbonnementsBydateExpire = (dateExpire) => {
    const abonnements = AllAbonnements();
    const result = abonnements.find(abonnement => abonnement.dateExpire.includes(dateExpire));
    return result;
};


// Récupérer les abonnements à partie de la date d'expiration
export const AbonnementsByidUsers = (dateExpire) => {
    const abonnements = AllAbonnements();
    const result = abonnements.find(abonnement => abonnement.dateExpire.includes(dateExpire));
    return result;
};

// Compte des abonnements fait pendant les 12 derniers mois
export const CourbeAbonnements = () => {
    const months = [];
    const currentDate = new Date();
    const monthNames = ["Jan", "Fév", "Mar", "Avr", "Mai", "Juin", "Jui", "Aoû", "Sep", "Oct", "Nov", "Déc"];
    for (let i = 0; i < 12; i++) {
        const month = currentDate.getMonth() - i;
        const monthName = monthNames[month < 0 ? 12 + month : month];
        months.push(monthName);
    }

    const values = [64, 61, 64, 62, 64, 60, 58, 5, 53, 54, 61, 60];

    const options = {
        animationEnabled: true,
        exportEnabled: true,
        theme: "light2",
        title: {
            text: 'Performance en abonnements des 12 derniers mois'
        },
        axisY: {
            title: "Abonnements",
        },
        axisX: {
            title: "Mois de l'année",
            interval: 1,
            // Remplacement des valeurs de l'axe X par les noms des mois
            labelFormatter: function (e) {
                return months[e.value];
            }
        },
        data: [{
            type: "line",
            toolTipContent: "Mois {x}: {y} abonnements",
            // Spécification des valeurs statiques dans l'axe Y
            dataPoints: [
                { x: 0, y: values[0] },
                { x: 1, y: values[1] },
                { x: 2, y: values[2] },
                { x: 3, y: values[3] },
                { x: 4, y: values[4] },
                { x: 5, y: values[5] },
                { x: 6, y: values[6] },
                { x: 7, y: values[7] },
                { x: 8, y: values[8] },
                { x: 9, y: values[9] },
                { x: 10, y: values[10] },
                { x: 11, y: values[11] },
            ]
        }]
    };
    return options;
};

// Compte des abonnements total fait 
export const abonnementsTotal = () => {
    const Abonnementstotal = 200;
    return Abonnementstotal ? Abonnementstotal : 0;
};

// Compte du montant abonnements total fait 
export const prixAbonnementsTotal = () => {
    const PrixAbonnementstotal = 20000;
    return PrixAbonnementstotal ? PrixAbonnementstotal : 0;
};

// Compte des abonnements actif 
export const abonnementsActifTotal = () => {
    const AbonnementsActifstotal = 100;
    return AbonnementsActifstotal ? AbonnementsActifstotal : 0;
}

// Compte du montant des abonnements actif 
export const prixAbonnementsActifTotal = () => {
    const PrixAbonnementsActifstotal = 10000;
    return PrixAbonnementsActifstotal ? PrixAbonnementsActifstotal : 0;
}

// Compte des abonnements fait ce mois 
export const abonnementsDelivréMois = () => {
    // récupére le numero du mois actuelle
    const Mois = currentMonthAndYear;
    // if ((Object.keys(result).length) !== 0) {}
    //faire le compte
    const AbonnementsDelivréMois = 10;
    return AbonnementsDelivréMois ? AbonnementsDelivréMois : 0
};

// Compte du montant des abonnements fait ce mois 
export const prixAbonnementsDelivréMois = () => {
    // récupére le numero du mois actuelle
    const Mois = currentMonthAndYear;
    //faire le compte
    const PrixAbonnementsDelivréMois = 5000;
    return PrixAbonnementsDelivréMois ? PrixAbonnementsDelivréMois : 0
};

// Compte des abonnements fait ce mois 
export const abonnementsExpireMois = () => {
    const abonnements = AbonnementsBydateExpire(currentMonthAndYear)
    // récupére le numero du mois actuelle
    const Mois = currentMonthAndYear;
    // if ((Object.keys(result).length) !== 0) {}
    //faire le compte
    const AbonnementsExpireMois = 5;
    return AbonnementsExpireMois ? AbonnementsExpireMois : 0
};

// Compte des abonnements fait ce mois 
export const prixAbonnementsExpireMois = () => {
    // récupére le numero du mois actuelle
    const Mois = currentMonthNumber;
    // if ((Object.keys(result).length) !== 0) {}
    //faire le compte
    const PrixAbonnementsExpireMois = 2000;
    return PrixAbonnementsExpireMois ? PrixAbonnementsExpireMois : 0
};


//Envoyer un fichier vers un dossier
export const uploadFile = (file) => {
    const path = `/src/Images/${file.name}`; // chemin vers le fichier sur le serveur
    const formData = new FormData();
    formData.append('file', file);

    // envoi du fichier vers le serveur
    fetch(path, {
        method: 'POST',
        body: formData
    }).then(response => {
        if (!response.ok) {
            throw new Error('Erreur lors de l\'envoi du fichier');
        }
        return response.json();
    }).then(data => {
        // récupération du chemin du fichier sur le serveur
        const filePath = data.path;
        console.log(filePath); // affiche le chemin menant vers le fichier sur le serveur
        return filePath;
    }).catch(error => {
        console.error(error);
    });
}