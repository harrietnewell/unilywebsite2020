const clientsClassAndCountMapping = {
    "c-clients--3": 3,
    "c-clients--4": 4,
    "c-clients--5": 5,
    "c-clients--6": 6,
};

document.addEventListener("DOMContentLoaded", () => {
    const clientsWrapperNode = document.querySelector(".c-clients");
    const clientsNodes = clientsWrapperNode?.children;
    const clientsNodesCount = clientsNodes?.length;

    let [clientsClass, clientsPerRow] = Object.entries(
        clientsClassAndCountMapping
    ).find(([clientsKey, clientsVal]) =>
        clientsWrapperNode.classList.contains(clientsKey)
    );

    const lastRowClientsCount = clientsNodesCount % clientsPerRow;

    if (lastRowClientsCount !== 0) {
        let clientIndex = 0;
        while (clientIndex < lastRowClientsCount) {
            let clientNodeIndex = clientsNodesCount - (1 + clientIndex);
            clientsNodes[clientNodeIndex].style.justifyContent = 'center';
            clientIndex++;
        }
    }
});