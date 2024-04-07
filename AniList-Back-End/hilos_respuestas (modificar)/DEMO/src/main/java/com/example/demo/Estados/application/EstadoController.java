package com.example.demo.Estados.application;

import com.example.demo.AppConfig;
import com.example.demo.CapaSeguridad.exception.EstadoNotFoundException;
import com.example.demo.CapaSeguridad.exception.UserNotFoundException;
import com.example.demo.Estados.EstadoDTO.EstadosDTO;
import com.example.demo.Estados.domain.EstadoRespository;
import com.example.demo.Estados.domain.Estados;
import com.example.demo.Estados.domain.EstadosService;
import com.example.demo.Usuario.domain.Usuario;
import com.example.demo.Usuario.domain.UsuarioRepository;
import com.example.demo.Usuario.domain.UsuarioService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Optional;

@RestController
@RequestMapping("/estados")
public class EstadoController {

    @Autowired
    EstadoRespository estadoRespository;


    @Autowired
    UsuarioRepository usuarioRepository;

    @Autowired
    UsuarioService usuarioService;

    @Autowired
    EstadosService estadosService;


    @GetMapping // Obtener todos los estados
    public ResponseEntity<List<EstadosDTO>> getAllEstados() {
        List<EstadosDTO> estados = estadosService.getAllEstados();
        return new ResponseEntity<>(estados, HttpStatus.OK);
    }

    @GetMapping("/busqueda/{estado_id}") // Obtener un estado por id
    public ResponseEntity<EstadosDTO> getEstadoById(@PathVariable("estado_id") Long estado_id) {
        EstadosDTO estado = estadosService.getEstadoById(estado_id);
        return new ResponseEntity<>(estado, HttpStatus.OK);
    }

    @GetMapping("/{user_name}") // Obtener todos los estados de un usuario
    public ResponseEntity<List<EstadosDTO>> getEstadosByUserId(@PathVariable("user_name") String user_name) {
        List<EstadosDTO> estados = estadosService.getEstadorByUserName(user_name);
        return new ResponseEntity<>(estados, HttpStatus.OK);
    }

    @PostMapping("/{nickname}")
    public ResponseEntity<EstadosDTO> crearEstado(@PathVariable String nickname,
                                                  @RequestBody EstadosDTO estadoDTO) {
        Usuario optionalUser = usuarioRepository.findByNickname(nickname);
        if (optionalUser != null) {
            Usuario user = optionalUser;

            EstadosDTO estadoResponse = estadosService.crearEstado(estadoDTO, user);
            return new ResponseEntity<>(estadoResponse, HttpStatus.CREATED);
        } else {
            throw new UserNotFoundException();
        }
    }

    @DeleteMapping("/{estadoId}") // Eliminar un estado
    public ResponseEntity<String> deleteEstado(@PathVariable("estadoId") Long estadoId) {
        estadosService.deleteEstadoById(estadoId);
        return ResponseEntity.ok("Estado eliminado correctamente");
    }

    @PatchMapping("/{estado_id}")
    public ResponseEntity<EstadosDTO> actualizarEstado(@PathVariable Long estado_id,
                                                       @RequestBody EstadosDTO estadoDTO) {
        Optional<Estados> optionalEstado = estadoRespository.findById(estado_id);

        if (optionalEstado.isPresent()) {
            Estados estado = optionalEstado.get();

            if (estadoDTO.getContenidos_url() != null) {
                estado.setContenidos(estadoDTO.getContenidos_url());
            }
            estadoRespository.save(estado);
            EstadosDTO estadoResponse = estadosService.mapToEstadosDTO(estado);
            return new ResponseEntity<>(estadoResponse, HttpStatus.OK);
        } else {
            throw new EstadoNotFoundException();
        }
    }







}
