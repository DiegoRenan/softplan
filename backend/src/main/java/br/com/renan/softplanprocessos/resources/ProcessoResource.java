package br.com.renan.softplanprocessos.resources;

import java.util.List;
import java.util.stream.Collectors;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.annotation.Secured;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RestController;

import br.com.renan.softplanprocessos.domain.Processo;
import br.com.renan.softplanprocessos.dto.ProcessoDTO;
import br.com.renan.softplanprocessos.services.ProcessoService;

@RestController
@RequestMapping(value="/processos")
public class ProcessoResource {
	
	@Autowired
	private ProcessoService service; 	
	
	@CrossOrigin
	@RequestMapping(value="/{id}", method=RequestMethod.GET)
	public ResponseEntity<Processo> findById(@PathVariable String id){
		Processo obj = service.findById(id);
		return ResponseEntity.ok().body(obj);
	}
		
	@CrossOrigin
	@RequestMapping(method=RequestMethod.GET)
	public ResponseEntity<List<ProcessoDTO>> findAll(){
		List<Processo> list = service.findAll();
		List<ProcessoDTO> listDTO = list.stream().map(x -> new ProcessoDTO(x)).collect(Collectors.toList());
		return ResponseEntity.ok().body(listDTO);
	}
	
}
