import React, { useState, useEffect } from "react";
import axios from "axios";
import "bootstrap/dist/css/bootstrap.min.css";

function RecipePage() {
  const [recipes, setRecipes] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [newRecipe, setNewRecipe] = useState({
    title: "",
    ingredients: "",
    instructions: "",
  });
  const [error, setError] = useState("");

 
  useEffect(() => {
    const fetchRecipes = async () => {
      try {
        const response = await axios.get("http://localhost:5000/api/recipes");
        setRecipes(response.data);
      } catch (err) {
        console.error("Erro ao buscar receitas:", err);
      }
    };

    fetchRecipes();
  }, []);

  
  const handleChange = (e) => {
    const { name, value } = e.target;
    setNewRecipe((prev) => ({ ...prev, [name]: value }));
  };

  
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const token = localStorage.getItem("token"); 
      const config = {
        headers: { Authorization: `Bearer ${token}` },
      };
      const response = await axios.post("http://localhost:5000/api/recipes", newRecipe, config);
      setRecipes((prev) => [...prev, response.data]); 
      setShowModal(false); 
      setNewRecipe({ title: "", ingredients: "", instructions: "" }); 
    } catch (err) {
      setError("Erro ao cadastrar receita. Verifique os dados ou tente novamente.");
      console.error("Erro ao cadastrar receita:", err);
    }
  };

  return (
    <div className="container mt-5 p-4 rounded">
      <div className="d-flex justify-content-between align-items-center mb-4">
        <h1 className="text-center">Receitas</h1>
        <button
          className="btn btn-primary"
          onClick={() => setShowModal(true)}
        >
          Adicionar Receita
        </button>
      </div>

      <div className="row">
        {recipes.map((recipe) => (
          <div key={recipe._id} className="col-md-4 mb-3">
            <div className="card shadow-sm">
              <div className="card-body">
                <h5 className="card-title">{recipe.title}</h5>
                <p className="card-text">
                  <strong>Ingredientes:</strong> {recipe.ingredients}
                </p>
                <p className="card-text">
                  <strong>Instruções:</strong> {recipe.instructions}
                </p>
              </div>
            </div>
          </div>
        ))}
      </div>

      {showModal && (
        <div
          className="modal d-block"
          tabIndex="-1"
          style={{ backgroundColor: "rgba(0, 0, 0, 0.5)" }}
        >
          <div className="modal-dialog">
            <div className="modal-content">
              <div className="modal-header">
                <h5 className="modal-title">Nova Receita</h5>
                <button
                  type="button"
                  className="btn-close"
                  onClick={() => setShowModal(false)}
                ></button>
              </div>
              <div className="modal-body">
                <form onSubmit={handleSubmit}>
                  <div className="mb-3">
                    <label htmlFor="title" className="form-label">
                      Título
                    </label>
                    <input
                      type="text"
                      id="title"
                      name="title"
                      className="form-control"
                      value={newRecipe.title}
                      onChange={handleChange}
                      required
                    />
                  </div>
                  <div className="mb-3">
                    <label htmlFor="ingredients" className="form-label">
                      Ingredientes
                    </label>
                    <textarea
                      id="ingredients"
                      name="ingredients"
                      className="form-control"
                      rows="3"
                      value={newRecipe.ingredients}
                      onChange={handleChange}
                      required
                    ></textarea>
                  </div>
                  <div className="mb-3">
                    <label htmlFor="instructions" className="form-label">
                      Instruções
                    </label>
                    <textarea
                      id="instructions"
                      name="instructions"
                      className="form-control"
                      rows="3"
                      value={newRecipe.instructions}
                      onChange={handleChange}
                      required
                    ></textarea>
                  </div>
                  {error && <div className="alert alert-danger">{error}</div>}
                  <button type="submit" className="btn btn-success w-100">
                    Cadastrar
                  </button>
                </form>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default RecipePage;
