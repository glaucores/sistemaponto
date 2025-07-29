package sistemaponto.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;
import sistemaponto.model.Employee;
import sistemaponto.model.Ponto;
import sistemaponto.repository.EmployeeRepository;
import sistemaponto.repository.PontoRepository;

import java.time.LocalDateTime;
import java.util.List;

@RestController
@RequestMapping("/pontos")
public class PontoController {

    @Autowired
    private PontoRepository pontoRepository;

    @Autowired
    private EmployeeRepository employeeRepository;

    // Registrar ponto
    @PostMapping
    public Ponto registrarPonto(@RequestParam Long employeeId, @RequestParam String tipo) {
        Employee employee = employeeRepository.findById(employeeId)
                .orElseThrow(() -> new RuntimeException("Funcionário não encontrado com id: " + employeeId));

        String tipoUpper = tipo.toUpperCase();
        if (!tipoUpper.equals("ENTRADA") && !tipoUpper.equals("SAIDA") &&
            !tipoUpper.equals("PAUSA") && !tipoUpper.equals("RETORNO")) {
            throw new RuntimeException("Tipo de ponto inválido. Deve ser ENTRADA, SAIDA, PAUSA ou RETORNO.");
        }

        Ponto ponto = new Ponto();
        ponto.setEmployee(employee);
        ponto.setTipo(tipoUpper);
        ponto.setDataHora(LocalDateTime.now());

         return pontoRepository.save(ponto);
    }

    // Listar todos os pontos
    @GetMapping
    public List<Ponto> listarTodos() {
        return pontoRepository.findAll();
    }
}

