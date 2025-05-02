async function fetchDetails() {
  let formNo = document.getElementById("formNo").value.trim();
  if (!formNo) {
    alert("Please enter a Form No.");
    return;
  }
  let url = `https://script.google.com/macros/s/AKfycbwk0FnNIkHyZCTFDZbUOvFFwCsADrnbI2nWZCR0RD9Y-lMHGOLdyuihOc8H4cadOzUd/exec?formNo=${formNo}`;
  
  try {
    let response = await fetch(url);
    if (!response.ok) throw new Error("Network response was not ok");

    let data = await response.json();
    if (data.length === 0) {
      alert("No details found for this Form No.");
      return;
    }

    let teacher = data[0]; // Assuming single record
    // Set hidden formNo for submission
    document.getElementById("hiddenFormNo").value = formNo;
    // Display teacher details in table
    let tableBody = document.getElementById("teacherTableBody");
    tableBody.innerHTML = `<tr>
      <td class="py-2 px-4 border-b">${teacher.name || ""}</td>
      <td class="py-2 px-4 border-b">${teacher.district || ""}</td>
      <td class="py-2 px-4 border-b">${teacher.designation || ""}</td>
      <td class="py-2 px-4 border-b">${teacher.school || ""}</td>
      <td class="py-2 px-4 border-b">${teacher.block || ""}</td>
      <td class="py-2 px-4 border-b">${teacher.mobile1 || ""}</td>
      <td class="py-2 px-4 border-b">${teacher.mobile2 || ""}</td>
      <td class="py-2 px-4 border-b">${teacher.salaryAc || ""}</td>
      <td class="py-2 px-4 border-b">${teacher.idPass || ""}</td>
      <td class="py-2 px-4 border-b">${teacher.salaryRegular || ""}</td>
    </tr>`;
    document.getElementById("teacherDetails").classList.remove("hidden");

  } catch (error) {
    console.error("Error fetching data:", error);
    alert("Error fetching data. Check console for details.");
  }
}

// Toggle visibility for conditional questions
document.getElementById("agentCashGiven").addEventListener("change", function() {
  document.getElementById("agentCashDetailsContainer").classList.toggle("hidden", this.value !== "Yes");
});

document.getElementById("letterWritten").addEventListener("change", function() {
  document.getElementById("letterCountContainer").classList.toggle("hidden", this.value !== "Yes");
});

// Handle form submission
async function submitForm(event) {
  event.preventDefault();

  const formData = {
    formNo: document.getElementById("formNo").value,
    verifierName: document.getElementById("verifierName").value,
    salaryAccount: document.getElementById("salaryAccount").value,
    ifscCode: document.getElementById("ifscCode").value,
    bankName: document.getElementById("bankName").value,
    branchChange: document.getElementById("branchChange").value,
    chequesGiven: document.getElementById("chequesGiven").value,
    chequesBank: document.getElementById("chequesBank").value,
    fileMembers: document.getElementById("fileMembers").value,
    guarantorChequesBank: document.getElementById("guarantorChequesBank").value,
    guarantorChequesCount: document.getElementById("guarantorChequesCount").value,
    agentCashGiven: document.getElementById("agentCashGiven").value,
    agentCashDetails: document.getElementById("agentCashDetails").value,
    agentMobiles: document.getElementById("agentMobiles").value,
    letterWritten: document.getElementById("letterWritten").value,
    letterCount: document.getElementById("letterCount").value,
    filePhoto: document.getElementById("filePhoto").value,
    fileLocation: document.getElementById("fileLocation").value,
    salaryRegularity: document.getElementById("salaryRegularity").value,
    ehrmsId: document.getElementById("ehrmsId").value,
    ehrmsPassword: document.getElementById("ehrmsPassword").value,
    branchName: document.getElementById("branchName").value,
    branchDistrict: document.getElementById("branchDistrict").value,
    guarantorDetail: document.getElementById("guarantorDetail").value
  };

  fetch("https://script.google.com/macros/s/AKfycbwk0FnNIkHyZCTFDZbUOvFFwCsADrnbI2nWZCR0RD9Y-lMHGOLdyuihOc8H4cadOzUd/exec", {
    method: "POST",
    mode: "no-cors",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(formData)
  })
  .then(response => {
    console.log("Data submitted");
    alert("Data submitted successfully.");
  })
  .catch(error => {
    console.error("Error submitting data:", error);
    alert("Failed to submit data.");
  });
}
