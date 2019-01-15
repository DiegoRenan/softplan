package br.com.renan.softplanprocessos.config;

import java.text.SimpleDateFormat;
import java.util.Arrays;
import java.util.TimeZone;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.CommandLineRunner;
import org.springframework.context.annotation.Configuration;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;

import br.com.renan.softplanprocessos.domain.Processo;
import br.com.renan.softplanprocessos.domain.User;
import br.com.renan.softplanprocessos.domain.Role;
import br.com.renan.softplanprocessos.dto.AuthorDTO;
import br.com.renan.softplanprocessos.dto.FeedbackDTO;
import br.com.renan.softplanprocessos.repository.ProcessoRepository;
import br.com.renan.softplanprocessos.repository.UserRepository;

@Configuration
public class Instantiation implements CommandLineRunner{
	
	@Autowired
	private UserRepository userRepository;
	
	@Autowired
	private BCryptPasswordEncoder bCryptPasswordEncoder;
	
	@Autowired
	private ProcessoRepository processoRepository;

	@Override
	public void run(String... args) throws Exception {
		SimpleDateFormat sdf = new SimpleDateFormat("dd/MM/yyyy");
		sdf.setTimeZone(TimeZone.getTimeZone("GMT"));
		
		userRepository.deleteAll();
		processoRepository.deleteAll();
		
		User maria = new User(null, "Maria Brown", Role.ADMINISTRADOR, bCryptPasswordEncoder.encode("password"));
		User alex = new User(null, "user", Role.TRIADOR, bCryptPasswordEncoder.encode("password"));
		User bob = new User(null, "Bob Grey", Role.TRIADOR, bCryptPasswordEncoder.encode("password"));
		
		userRepository.saveAll(Arrays.asList(maria, alex, bob));
		
		Processo processo1 = new Processo(null, sdf.parse("21/03/2018"), "Novo Processo", "Hello Processo", new AuthorDTO(maria));
		Processo processo2 = new Processo(null, sdf.parse("20/04/2018"), "Novo Processo", "Hey Processo", new AuthorDTO(maria));
		
		FeedbackDTO fb1 = new FeedbackDTO("Boa viagem mano", sdf.parse("21/03/2018"), new AuthorDTO(alex)); 
		FeedbackDTO fb2 = new FeedbackDTO("Blz", sdf.parse("20/04/2018"), new AuthorDTO(alex));
		
		processo1.getFeedbacks().addAll(Arrays.asList(fb1, fb2));
		
		processoRepository.saveAll(Arrays.asList(processo1, processo2));
		
		maria.getProcessos().addAll(Arrays.asList(processo1, processo2));		
		userRepository.save(maria);
	}


}
