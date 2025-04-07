document.addEventListener('DOMContentLoaded', function() {
    // Elementos del DOM
    const totalPlayersInput = document.getElementById('totalPlayers');
    const teamCountInput = document.getElementById('teamCount');
    const sortButton = document.getElementById('sortButton');
    const playerInputModal = document.getElementById('playerInputModal');
    const participantsTextarea = document.getElementById('participants');
    const confirmPlayersButton = document.getElementById('confirmPlayers');
    
    // Equipos
    const teamResults = [
        document.getElementById('team1'),
        document.getElementById('team2'),
        document.getElementById('team3'),
        document.getElementById('team4')
    ];
    
    // Lista de jugadores
    let players = [];
    
    // Evento para mostrar el modal al iniciar
    sortButton.addEventListener('click', function() {
        // Validar número de jugadores
        const totalPlayers = parseInt(totalPlayersInput.value);
        const playersPerTeam = parseInt(teamCountInput.value);
        
        if (totalPlayers < 2) {
            alert('Debes ingresar al menos 2 jugadores.');
            return;
        }
        
        if (playersPerTeam < 1) {
            alert('Debe haber al menos 1 jugador por equipo.');
            return;
        }
        
        // Mostrar modal para ingresar jugadores
        playerInputModal.classList.add('show');
        
        // Enfocar el textarea
        participantsTextarea.focus();
    });
    
    // Evento para confirmar jugadores y realizar el sorteo
    confirmPlayersButton.addEventListener('click', function() {
        // Obtener los jugadores del textarea
        players = getPlayersList();
        
        // Verificar que hay suficientes jugadores
        const totalPlayers = parseInt(totalPlayersInput.value);
        if (players.length < totalPlayers) {
            alert(`Debes ingresar al menos ${totalPlayers} nombres de jugadores.`);
            return;
        }
        
        if (players.length > totalPlayers) {
            players = players.slice(0, totalPlayers);
        }
        
        // Ocultar modal
        playerInputModal.classList.remove('show');
        
        // Realizar el sorteo
        const shuffledPlayers = shuffleArray([...players]);
        const teams = divideIntoTeams(shuffledPlayers, teamCountInput.value);
        
        // Mostrar equipos
        displayTeams(teams);
    });
    
    // Obtener lista de jugadores del textarea
    function getPlayersList() {
        const text = participantsTextarea.value.trim();
        
        if (text === '') {
            return [];
        }
        
        // Si el texto contiene comas, dividir por comas
        if (text.includes(',')) {
            return text.split(',')
                .map(name => name.trim())
                .filter(name => name !== '');
        } 
        // Si no, dividir por líneas
        else {
            return text.split('\n')
                .map(name => name.trim())
                .filter(name => name !== '');
        }
    }
    
    // Mezclar aleatoriamente un array (algoritmo Fisher-Yates)
    function shuffleArray(array) {
        for (let i = array.length - 1; i > 0; i--) {
            const j = Math.floor(Math.random() * (i + 1));
            [array[i], array[j]] = [array[j], array[i]];
        }
        return array;
    }
    
    // Dividir jugadores en equipos según cantidad de jugadores por equipo
    function divideIntoTeams(players, playersPerTeam) {
        // Calcular número de equipos
        const numTeams = Math.ceil(players.length / playersPerTeam);
        
        // No mostrar más de 4 equipos (límite de la interfaz)
        const limitedNumTeams = Math.min(numTeams, 4);
        
        // Crear equipos vacíos
        const teams = Array.from({ length: limitedNumTeams }, () => []);
        
        // Distribuir jugadores
        players.forEach((player, index) => {
            const teamIndex = index % limitedNumTeams;
            teams[teamIndex].push(player);
        });
        
        return teams;
    }
    
    // Mostrar equipos en la interfaz
    function displayTeams(teams) {
        // Limpiar todos los contenedores
        teamResults.forEach(container => {
            container.innerHTML = '';
        });
        
        // Mostrar jugadores en cada equipo
        teams.forEach((team, index) => {
            if (index < teamResults.length) {
                teamResults[index].textContent = team.join(', ');
            }
        });
    }
    
    // Inicializar modal
    window.onclick = function(event) {
        if (event.target === playerInputModal) {
            playerInputModal.classList.remove('show');
        }
    };
}); 
