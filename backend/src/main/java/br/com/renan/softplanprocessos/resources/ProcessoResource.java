package br.com.renan.softplanprocessos.resources;

import java.net.URI;
import java.util.ArrayList;
import java.util.Date;
import java.util.List;
import java.util.stream.Collectors;
import java.util.stream.Stream;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.annotation.Secured;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.servlet.support.ServletUriComponentsBuilder;

import br.com.renan.softplanprocessos.domain.Processo;
import br.com.renan.softplanprocessos.dto.AuthorDTO;
import br.com.renan.softplanprocessos.dto.FeedbackDTO;
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
	
	//@Secured({"TRIADOR", "ADMINISTRADOR"})
	@CrossOrigin
	@RequestMapping(method=RequestMethod.POST)
	public ResponseEntity<Void> insert(@RequestBody ProcessoDTO objDto){
		Processo obj = service.fromDTO(objDto);
		obj = service.insert(obj);
		URI uri = ServletUriComponentsBuilder.fromCurrentRequest().path("/{id}").buildAndExpand(obj.getId()).toUri();
		return ResponseEntity.created(uri).build();
	}
	
	@CrossOrigin
	@RequestMapping(value="/pendentes", method=RequestMethod.GET)
	public ResponseEntity<List<ProcessoDTO>> pendentes(){
		List<Processo> list = (List<Processo>) service.findPendentes();
		List<ProcessoDTO> listDTO = list.stream().map(x -> new ProcessoDTO(x)).collect(Collectors.toList());
		return ResponseEntity.ok().body(listDTO);
	}
	
	@CrossOrigin
	@RequestMapping(value="/{id}/pendentes", method=RequestMethod.GET)
	public ResponseEntity<List<ProcessoDTO>> pendentesByUser(@PathVariable String id){
		List<Processo> list = service.findAll();
		List<Processo> newList = new ArrayList<>();

		list.forEach(
				x ->{ 
					for(FeedbackDTO f : x.getFeedback()) {
						if(f.getAuthor().getId().equals(id) && f.getText().equals(" ")) {
							newList.add(x);
						}
					}
				}
		);
		
		List<ProcessoDTO> listDTO = newList.stream().map(x -> new ProcessoDTO(x))
												 .collect(Collectors.toList());
											
												
		return ResponseEntity.ok().body(listDTO);
	}
	

	@CrossOrigin
	@RequestMapping(value="/{id}/feedback", method=RequestMethod.POST)
	public  ResponseEntity<Void> insertFeedback(@PathVariable String id, @RequestBody FeedbackDTO fbDto){
		Processo obj = service.findById(id);
		fbDto.setDate(new Date());
		obj.addFeedback(fbDto);
		obj = service.update(obj);	
		URI uri = ServletUriComponentsBuilder.fromCurrentRequest().path("/{id}").buildAndExpand(obj.getId()).toUri();
		return ResponseEntity.created(uri).build();
	}
	
}
