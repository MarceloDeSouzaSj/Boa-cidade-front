using Microsoft.AspNetCore.Mvc;

namespace BoaCidade.Web.Controllers;

public class ContaController : Controller
{
    public IActionResult Login() => View();
    public IActionResult Cadastro() => View();
}
