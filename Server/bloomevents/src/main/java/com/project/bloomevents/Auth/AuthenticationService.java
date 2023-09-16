package com.project.bloomevents.Auth;

import com.project.bloomevents.Config.JwtService;
import com.project.bloomevents.DTO.UserDTO;
import com.project.bloomevents.DTO.UserFullDTO;
import com.project.bloomevents.Model.LoginDetails;
import com.project.bloomevents.Repository.LoginDetailsRepository;
import com.project.bloomevents.ServiceImpl.UserServiceImpl;
import lombok.RequiredArgsConstructor;
import org.modelmapper.ModelMapper;
import org.modelmapper.TypeToken;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

@Service
@RequiredArgsConstructor
public class AuthenticationService {
    @Autowired
    private final LoginDetailsRepository repo;
    @Autowired
    private final PasswordEncoder passwordEncoder;
    @Autowired
    private final JwtService jwtService;
    @Autowired
    private final AuthenticationManager authenticationManager;

    @Autowired
    private final UserServiceImpl userServiceImpl;
    @Autowired
    private ModelMapper modelMapper;

    public AuthenticationResponse register(UserFullDTO userdata) {
        UserDTO userDTO = userServiceImpl.addUser(userdata);
        if(userDTO !=null){
            var user = modelMapper.map(userdata, LoginDetails.class);
            //UserDTO newUser=userServiceImpl.getUserById(userDTO.getUserId());
            var jwtToken = jwtService.generateToken(user);
            //System.out.println(jwtToken);
            return  AuthenticationResponse.builder()
                    .token(jwtToken)
                    .user(userDTO)
                    .build();
        }
        return null;

    }

    public AuthenticationResponse authenticate(AuthenticationRequest request) {
        try{

            authenticationManager.authenticate(
                    new UsernamePasswordAuthenticationToken(
                            request.getEmail(),
                            request.getPassword()
                    )
            );

            var user = repo.findByEmail(request.getEmail())
                    .orElseThrow();
            //System.out.println(user.getUsername());
            if(user!=null){
                var jwtToken = jwtService.generateToken(user);
                return AuthenticationResponse.builder()
                        .token(jwtToken)
                        .user(modelMapper.map(user.getUser(), new TypeToken<UserDTO>() {}.getType()))
                        .build();
            }
            else{
                return null;
            }
        }catch(Exception e){
            System.out.println(e.toString());
            return null;
        }
    }

}
